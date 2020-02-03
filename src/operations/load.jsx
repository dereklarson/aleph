// @format
import axios from 'axios';
import _ from 'lodash';
import {requestOrg} from '@utils/state';
import {modify} from '@data/reducers';

// All of these are thunked to give access to state and asynchronicity

export function loadOrg() {
  return function(dispatch, getState) {
    let org = getState()['config']['organization'];
    console.log(`---Loading Organization---`);
    axios
      .post(`/repo/pull/${org.uid}`, {repository: org.repository})
      .then(response => {
        dispatch(modify('config', response.data));
      });
  };
}

export function loadCore(source, location) {
  return function(dispatch, getState) {
    let org = getState()['config']['organization'];
    if (['pipeline', 'docker'].includes(location)) {
      console.log(`---Loading ${location} ${source}---`);
      axios.get(`/coreload/${source}/${location}/${org.uid}`).then(response => {
        dispatch(modify(source, response.data));
      });
    }
  };
}

export function loadInputs(config) {
  let org = _.cloneDeep(config.organization);
  const savefunc = fieldText => modify('config', {organization: fieldText});
  return async function(dispatch) {
    console.log('---Loading Inputs ---');
    await axios.get('/input').then(response => {
      dispatch(modify('config', response.data));
      Object.assign(org, _.get(response.data, 'organization', {}));
      if (org.name.includes('<')) {
        console.log('Requesting org...');
        dispatch(modify('context', {...requestOrg, func: savefunc}));
      }
    });
    console.log('Performing initial refresh');
    dispatch(loadCore('library', 'docker'));
    dispatch(loadCore('library', 'pipeline'));
    dispatch(loadCore('diagrams', 'docker'));
    dispatch(loadCore('diagrams', 'pipeline'));
    console.log('...Finished');
  };
}

export function saveCheckpoint(name) {
  return function(dispatch, getState) {
    console.log('---Saving Full State Checkpoint---');
    let {context, ...saveState} = getState();
    axios.post(`/checkpoint/save/${name}`, saveState);
  };
}

export function loadCheckpoint(name) {
  return function(dispatch, getState) {
    console.log('---Loading Full State Checkpoint---');
    axios.get(`/checkpoint/load/${name}`).then(response => {
      dispatch(modify('vertices', response.data.vertices));
      dispatch(modify('library', response.data.library));
    });
  };
}

export function saveDiagram(location, name) {
  return function(dispatch, getState) {
    console.log(`---Saving ${location} Diagram---`);
    let state = getState();
    let vertices = state.vertices[location];
    let corpus = state.corpus[location];
    console.log(vertices, corpus);
    axios.post('/save_diagram', {
      location: location,
      name: name,
      state: {vertices, corpus},
    });
  };
}
