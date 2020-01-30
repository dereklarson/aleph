// @format
import axios from 'axios';
import _ from 'lodash';
import {getLastLine, generateCorpus} from '@utils/helpers';
import {blankOperations} from '@data/reference';
import {modify} from '@data/reducers';

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
          building: step.uid,
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

// export function buildPipeline(operations, cancel) {
//   return async function(dispatch, getState) {
//     console.log('---Building Pipeline---');
//     let build_context = {};
//     await axios
//       .post('/gen_build/pipeline', {
//         vertices: currentState.vertices.present.pipeline,
//         corpus: currentState.corpus.pipeline,
//         build_id: currentState.focus,
//       })
//       .then(response => {
//         build_context = response.data.build_context;
//       });
//     console.log(build_context);
//     await axios
//       .post(`/build/${location}`, {build_context: build_context})
//       .then(response => {
//         console.log('...built');
//       });
//     dispatch(modify('operations', blankOperations));
//   };
// }
