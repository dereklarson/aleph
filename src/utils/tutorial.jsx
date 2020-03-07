// @format
import axios from 'axios';
import _ from 'lodash';
import {saveCheckpoint, loadCheckpoint} from '@ops/load';
import {modify} from '@data/reducers';
import {sleep} from './helpers';

export function playTutorial(tutorialName, cancel = {current: false}) {
  return async function(dispatch, getState) {
    console.log('---Building Tutorial---', tutorialName);
    let steps = [];
    await axios
      .post('/play_tutorial', {tutorial_name: tutorialName})
      .then(response => {
        steps = steps.concat(response.data);
      });
    saveCheckpoint('system');
    // TODO fix this based on new state
    // _.keys(tutorialInitialState).forEach(key => {
    //   dispatch(modify(key, tutorialInitialState[key]));
    // });
    for (const [index, step] of steps.entries()) {
      if (cancel.current === true) {
        cancel.current = false;
        break;
      }
      const percent = Math.floor((100 * index) / steps.length);
      dispatch(modify('operations', {tickertext: step.text, percent: percent}));
      _.keys(step.state).forEach(key => {
        dispatch(modify(key, step.state[key]));
      });
      await sleep(1000);
    }
    loadCheckpoint('system');
  };
}
