// @format
import axios from 'axios';
import _ from 'lodash';
import {getLastLine, generateCorpus} from '@utils/helpers';
import {blankOperations} from '@data/reference';
import {modify} from '@data/reducers';

export function prepareFocusedBuild() {
  return async function(dispatch, getState) {
    let state = getState();
    let location = state.context.location;
    let focus = state.context.focus;
    let vertices = state.vertices[location];
    let library = state.library[location];
    let corpus = generateCorpus({
      vertices,
      library,
      corpus: state.corpus[location],
    });
    console.log(corpus);
    if (location === 'docker') {
      console.log('---Preparing docker build for current focus---');
      axios
        .post('/gen_build/docker', {vertices, corpus, build_id: focus})
        .then(response => {
          dispatch(modify('operations', response.data));
        });
    } else if (location === 'pipeline') {
      console.log('---Building Pipeline from Focus---');
      let build_context = {};
      await axios
        .post('/gen_build/pipeline', {vertices, corpus, build_id: focus})
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
      console.log('Only docker and pipeline builds supported');
    }
  };
}

export function buildDocker(operations, cancel) {
  console.log('---Building Docker Image---');
  return async function(dispatch, getState) {
    let state = getState();
    let current_cache = state.cache.build;
    let new_cache = {};
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
          building: step.uid,
          tickertext: ticker,
          percent: percent,
        }),
      );
      if (_.has(current_cache, step.hash)) {
        continue;
      }
      await axios.post('/build/docker', {build_order: step}).then(response => {
        dispatch(modify('operations', response.data));
      });
      new_cache[step.hash] = true;
      dispatch(modify('cache', {build: {...current_cache, ...new_cache}}));
    }
    dispatch(modify('operations', blankOperations));
  };
}
