// @format
import axios from 'axios';
import _ from 'lodash';
import {genTextEdit} from '@utils/state';
import {
  modify,
  removeDiagram,
  loadDiagramVertices,
  loadDiagramCorpus,
} from '@data/reducers';

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

export function pushOrg({branch, commit_msg}) {
  return function(dispatch, getState) {
    let org = getState()['config']['organization'];
    console.log(`---Pushing to Organization Repo---`);
    axios
      .post(`/repo/push/${org.uid}`, {
        branch,
        commit_msg,
        repository: org.repository,
      })
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

export function loadDiagram({location, content, uid}) {
  return async function(dispatch, getState) {
    let content = getState().diagrams[location][uid];
    dispatch(modify('vertices', {[location]: {}}));
    dispatch(modify('corpus', {[location]: {}}));
    dispatch(loadDiagramVertices({location, content, uid}));
    dispatch(loadDiagramCorpus({location, content, uid}));
    dispatch(modify('context', {uid}));
  };
}

export function deleteSavedDiagram({location, uid}) {
  return async function(dispatch) {
    let source = 'diagrams';
    dispatch(removeDiagram({location, uid}));
    axios.get(`/delete/${source}/${location}/${uid}`);
  };
}

function delay(millis) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, millis);
  });
}

export function loadDatasets() {
  return function(dispatch) {
    axios.get('/datasets').then(response => {
      dispatch(modify('datasets', response.data));
    });
  };
}

export function loadInputs(config) {
  let org = _.cloneDeep(config.organization);
  const savefunc = fieldText => modify('config', {organization: fieldText});
  console.log('--- Performing Initial Data Load ---');
  return async function(dispatch, getState) {
    console.log('  -Loading Inputs-');
    await axios.get('/input').then(response => {
      dispatch(modify('config', response.data));
      Object.assign(org, _.get(response.data, 'organization', {}));
      if (org.name.includes('<')) {
        console.log('Requesting org...');
        dispatch(genTextEdit('fetchOrg', savefunc));
      }
    });
    console.log('  -Loading each source/location-');
    await Promise.all([
      dispatch(loadCore('library', 'docker')),
      dispatch(loadCore('library', 'pipeline')),
      dispatch(loadCore('diagrams', 'docker')),
      dispatch(loadCore('diagrams', 'pipeline')),
      dispatch(loadDatasets()),
      delay(1000),
    ]);
    console.log('  -Loading user checkpoint-');
    dispatch(loadCheckpoint('user'));
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
  return function(dispatch) {
    console.log('---Loading Full State Checkpoint---');
    axios.get(`/checkpoint/load/${name}`).then(response => {
      dispatch(modify('vertices', response.data.vertices));
      dispatch(modify('corpus', response.data.corpus));
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
    dispatch(modify('context', {name}));
    axios.post('/save_diagram', {
      location: location,
      name: name,
      state: {vertices, corpus},
    });
  };
}

export function getImages() {
  return function(dispatch) {
    console.log(`---Loading Docker Images---`);
    axios.get('/docker/list').then(response => {
      dispatch(modify('operations', response.data));
    });
  };
}

// Thunked: will return function taking dispatch
export function pushImages(organization, match_string) {
  return async function(dispatch, getState) {
    console.log('---Pushing Docker images ---');
    axios.post('/docker/push', {organization, match_string}).then(response => {
      dispatch(modify('context', response.data));
    });
  };
}
