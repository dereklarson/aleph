// @format
import axios from 'axios';
import _ from 'lodash';
import {getLastLine} from './helpers';
import {blankOperations} from './stateReference';
import {requestOrg} from './stateHelpers';

export const modify = (loc, update) => ({
  type: `MODIFY_${loc.toUpperCase()}`,
  update: update,
});

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

export function saveDiagram(location, name, partialState) {
  console.log(`---Saving ${location} Diagrams---`);
  return axios.post('/save_diagram', {
    location: location,
    name: name,
    state: partialState,
  });
}

export function prepareBuildFocus(currentState, dispatch) {
  if (currentState.location === 'docker') {
    console.log('---Preparing build for current focus---');
    axios
      .post('/gen_build/docker', {
        vertices: currentState.vertices.present.docker,
        corpus: currentState.corpus.docker,
        build_id: currentState.focus,
      })
      .then(response => {
        dispatch(modify('operations', response.data));
      });
  } else {
    console.log('Not supported building non-docker');
  }
}

export async function build(currentState, cancel, dispatch) {
  let current_cache = {};
  let location = currentState.location;
  if (location === 'docker') {
    console.log('---Building Docker Image---');
    for (const [index, step] of currentState.build_orders.entries()) {
      if (cancel.current === true) {
        cancel.current = false;
        break;
      }
      const percent = Math.floor(
        (100 * index) / currentState.build_orders.length,
      );
      const ticker = getLastLine(step.text);
      dispatch(
        modify('operations', {
          building: step.id,
          tickertext: ticker,
          percent: percent,
        }),
      );
      if (_.has(currentState.build_cache, step.hash)) {
        continue;
      }
      await axios
        .post(`/build/${location}`, {build_order: step})
        .then(response => {
          dispatch(modify('operations', response.data));
        });
      current_cache[step.hash] = true;
      dispatch(
        modify('cache', {
          build_cache: {...currentState.build_cache, ...current_cache},
        }),
      );
    }
    dispatch(modify('operations', blankOperations));
  } else if (location === 'pipeline') {
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
  } else {
    console.log('Not supported building besides docker or pipeline locations');
  }
}

// TODO Make this work across the board
export const clearDiagram = location => modify('vertices', {[location]: []});
