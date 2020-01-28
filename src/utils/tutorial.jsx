// @format
import axios from 'axios';
import {saveCheckpoint, loadCheckpoint, modify} from './loaders';
import {sleep} from './helpers';
import {tutorialInitialState} from './stateReference';

export async function playTutorial(tutorialName, state, cancel, dispatch) {
  console.log('---Building---', tutorialName);
  let steps = [];
  await axios
    .post('/play_tutorial', {tutorial_name: tutorialName})
    .then(response => {
      steps = steps.concat(response.data);
    });
  console.log(steps);
  saveCheckpoint('system', state);
  dispatch(modify('vertices', tutorialInitialState));
  for (const [index, step] of steps.entries()) {
    if (cancel.current === true) {
      cancel.current = false;
      break;
    }
    const percent = Math.floor((100 * index) / steps.length);
    dispatch(
      modify('operations', {
        tickertext: step.text,
        percent: percent,
        ...step.state,
      }),
    );
    await sleep(1000);
  }
  loadCheckpoint('system', dispatch);
}
