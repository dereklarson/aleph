// @format
import axios from 'axios';
import _ from 'lodash';
import {getLastLine} from './helpers';
import {blankOperations} from './stateReference';

export const modifyState = update => ({
  type: 'MODIFY_STATE',
  update: update,
});

// Thunked: will return function taking dispatch
export function loadInputs() {
  return function(dispatch) {
    console.log('---Loading Inputs ---');
    axios.get('/input').then(response => {
      dispatch(modifyState(response.data));
    });
  };
}

// Thunked: will return function taking dispatch
export function loadCore(source, location) {
  return function(dispatch) {
    if (['pipeline', 'docker'].includes(location)) {
      console.log(`---Loading ${location} ${source}---`);
      axios.get(`/coreload/${source}/${location}`).then(response => {
        dispatch(modifyState(response.data));
      });
    }
    console.log(`---Loading Docker Images---`);
    axios.get('/docker_images').then(response => {
      dispatch(modifyState(response.data));
    });
  };
}

export function saveCheckpoint(name, state) {
  console.log('---Saving Full State Checkpoint---');
  return axios.post(`/save_checkpoint/${name}`, state);
}

export function loadCheckpoint(name, dispatch) {
  console.log('---Loading Full State Checkpoint---');
  return axios.get(`/load_checkpoint/${name}`).then(response => {
    dispatch(modifyState(response.data));
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
        vertices: currentState.docker_vertices,
        fulltext: currentState.docker_fulltext,
        build_id: currentState.focus,
      })
      .then(response => {
        dispatch(modifyState(response.data));
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
        modifyState({building: step.id, tickertext: ticker, percent: percent}),
      );
      if (_.has(currentState.build_cache, step.hash)) {
        continue;
      }
      await axios
        .post(`/build/${location}`, {build_order: step})
        .then(response => {
          dispatch(modifyState(response.data));
        });
      current_cache[step.hash] = true;
      dispatch(
        modifyState({
          build_cache: {...currentState.build_cache, ...current_cache},
        }),
      );
    }
    dispatch(modifyState(blankOperations));
  } else if (location === 'pipeline') {
    console.log('---Building Pipeline---');
    let build_context = {};
    await axios
      .post('/gen_build/pipeline', {
        vertices: currentState.pipeline_vertices,
        fulltext: currentState.pipeline_fulltext,
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
    dispatch(modifyState(blankOperations));
  } else {
    console.log('Not supported building besides docker or pipeline locations');
  }
}

// TODO Make this work across the board
export const clearDiagram = location =>
  modifyState({
    ...blankOperations,
    [`${location}_vertices`]: [],
    [`${location}_fulltext`]: new Map(),
  });
