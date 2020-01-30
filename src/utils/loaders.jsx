// @format
import axios from 'axios';
import _ from 'lodash';
import {getLastLine, generateCorpus} from './helpers';
import {blankOperations} from './stateReference';
import {requestOrg} from './stateHelpers';
import {modify} from './reducers';

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
  console.log('---Saving Full State Checkpoint---');
  return axios.post(`/checkpoint/save/${name}`, state);
}

export function loadCheckpoint(name, dispatch) {
  console.log('---Loading Full State Checkpoint---');
  return axios.get(`/checkpoint/load/${name}`).then(response => {
    dispatch(modify('vertices', response.data));
  });
}

export function saveDiagram(location, name) {
  return function(dispatch, getState) {
    let state = getState();
    let vertices = state.vertices.location;
    let corpus = state.corpus.location;
    console.log(`---Saving ${location} Diagrams---`);
    return axios.post('/save_diagram', {
      location: location,
      name: name,
      state: {vertices, corpus},
    });
  };
}

export function prepareFocusedBuild() {
  return function(dispatch, getState) {
    let state = getState();
    let location = state.context.location;
    if (location === 'docker') {
      console.log('---Preparing build for current focus---');
      let vertices = state.vertices[location];
      let library = state.library[location];
      let corpus = generateCorpus({
        vertices,
        library,
        corpus: state.corpus[location],
      });
      console.log(corpus);
      axios
        .post('/gen_build/docker', {
          vertices,
          corpus,
          build_id: state.context.focus,
        })
        .then(response => {
          dispatch(modify('operations', response.data));
        });
    } else {
      console.log('Not supported building non-docker');
    }
  };
}

export function buildDocker(operations, cancel) {
  console.log('---Building Docker Image---');
  return async function(dispatch, getState) {
    let new_cache = {};
    let location = getState().context.location;
    let current_cache = getState().cache.build;
    for (const [index, step] of operations.build_orders.entries()) {
      if (cancel.current === true) {
        cancel.current = false;
        break;
      }
      const percent = Math.floor(
        (100 * index) / operations.build_orders.length,
      );
      const ticker = getLastLine(step.text);
      dispatch(
        modify('operations', {
          building: step.id,
          tickertext: ticker,
          percent: percent,
        }),
      );
      if (_.has(current_cache, step.hash)) {
        continue;
      }
      await axios
        .post(`/build/${location}`, {build_order: step})
        .then(response => {
          dispatch(modify('operations', response.data));
        });
      new_cache[step.hash] = true;
      dispatch(modify('cache', {build: {...current_cache, ...new_cache}}));
    }
    dispatch(modify('operations', blankOperations));
  };
}

export function buildPipeline(operations, cancel) {
  return async function(dispatch, getState) {
    console.log('---Building Pipeline---');
    let build_context = {};
    await axios
      .post('/gen_build/pipeline', {
        vertices: currentState.vertices.present.pipeline,
        corpus: currentState.corpus.pipeline,
        build_id: currentState.focus,
      })
      .then(response => {
        build_context = response.data.build_context;
      });
    console.log(build_context);
    await axios
      .post(`/build/${location}`, {build_context: build_context})
      .then(response => {
        console.log('...built');
      });
    dispatch(modify('operations', blankOperations));
  };
}
