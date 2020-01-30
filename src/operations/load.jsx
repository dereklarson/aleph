// @format
import axios from 'axios';
import _ from 'lodash';
import {requestOrg} from '@utils/state';
import {modify} from '@data/reducers';

// Thunked: will return function taking dispatch
export function loadInputs(config) {
  let org = _.cloneDeep(config.organization);
  const savefunc = fieldText => modify('config', {organization: fieldText});
  return function(dispatch) {
    console.log('---Loading Inputs ---');
    axios.get('/input').then(response => {
      dispatch(modify('config', response.data));
      Object.assign(org, _.get(response.data, 'organization', {}));
      if (org.name.includes('<')) {
        console.log('Requesting org...');
        dispatch(modify('context', {...requestOrg, func: savefunc}));
      }
    });
  };
}

// Thunked: will return function taking dispatch
export function loadOrg() {
  return function(dispatch, getState) {
    let org = getState()['config']['organization'];
    console.log(`---Loading Organization---`);
    console.log(org);
    axios
      .post(`/repo/${org.uid}`, {repository: org.repository})
      .then(response => {
        dispatch(modify('config', response.data));
      });
  };
}

// Thunked: will return function taking dispatch
export function loadCore(source, location) {
  return function(dispatch, getState) {
    let org = getState()['config']['organization'];
    console.log(org);
    if (['pipeline', 'docker'].includes(location)) {
      console.log(`---Loading ${location} ${source}---`);
      axios.get(`/coreload/${source}/${location}/${org.uid}`).then(response => {
        dispatch(modify(source, response.data));
      });
    }
    console.log(`---Loading Docker Images---`);
    axios.get('/docker_images').then(response => {
      dispatch(modify('operations', response.data));
    });
  };
}

export function saveCheckpoint(name, state) {
  return function(dispatch, getState) {
    console.log('---Saving Full State Checkpoint---');
    let state = getState();
    delete state.context;
    axios.post(`/checkpoint/save/${name}`, state);
  };
}

export function loadCheckpoint(name, dispatch) {
  console.log('---Loading Full State Checkpoint---');
  axios.get(`/checkpoint/load/${name}`).then(response => {
    dispatch(modify('vertices', response.data));
  });
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
