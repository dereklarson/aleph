// @format
import axios from 'axios';
import _ from 'lodash';
import {getLastLine} from '@utils/helpers';
import {blankOperations} from '@data/reference';
import {modify} from '@data/reducers';
import {getBuildData} from '@data/tools';

export function build(cancel) {
  return async function(dispatch, getState) {
    const state = getState();
    const location = state.context.location;
    let current_cache = state.cache.build;
    let new_cache = {};
    const {vertices, corpus, metadata} = getBuildData(state);

    console.log(`---Building ${location} from Focus---`);
    if (location === 'docker') {
      let build_orders = [];
      await axios
        .post('/gen_build/docker', {vertices, corpus, metadata})
        .then(response => {
          build_orders = response.data.build_orders;
        });
      console.log('---Building Docker Image---');
      for (const [index, step] of build_orders.entries()) {
        if (cancel.current === true) {
          cancel.current = false;
          break;
        }
        dispatch(
          modify('operations', {
            build_orders,
            tickertext: getLastLine(step.text),
            percent: Math.floor((100 * index) / build_orders.length),
            building: step.uid,
          }),
        );
        if (_.has(current_cache, step.hash)) {
          continue;
        }
        await axios
          .post('/build/docker', {build_order: step})
          .then(response => {
            dispatch(modify('operations', response.data));
          });
        new_cache[step.hash] = true;
        dispatch(modify('cache', {build: {...current_cache, ...new_cache}}));
      }
      dispatch(modify('operations', blankOperations));
    } else if (location === 'pipeline') {
      dispatch(modify('operations', {percent: 0}));
      let build_context = {};
      await axios
        .post('/gen_build/pipeline', {vertices, corpus, metadata})
        .then(response => {
          build_context = response.data.build_context;
        });
      dispatch(modify('operations', {percent: 50}));
      await axios
        .post(`/build/${location}`, {build_context: build_context})
        .then(response => {
          console.log('...built');
        });
      dispatch(modify('operations', {percent: 100}));
    } else {
      console.log('Only docker and pipeline builds supported');
    }
  };
}

export function runPipeline() {
  return async function(dispatch, getState) {
    let state = getState();
    let location = state.context.location;
    let metadata = {
      name: state.environment[location].envName,
    };
    if (location === 'pipeline') {
      console.log('---Running Pipeline---');
      await axios.post('/run/pipeline', {metadata}).then(response => {
        dispatch(modify('operations', response.data));
      });
    }
  };
}
