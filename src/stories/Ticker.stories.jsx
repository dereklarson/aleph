// @format
import {text, number} from '@storybook/addon-knobs';
import {genStoryEntry, getStoryGenerator} from './testHelpers';
import {excitedState} from './testStates';
import {PureTicker} from '@depot/Ticker';

const TestComponent = PureTicker;
// Generate a Storybook entry based on the following key args (order, component, state)
export default genStoryEntry(8, TestComponent, excitedState);

// testData should containing a baseline object of properties to pass into the component
export const testData = {
  operations: {
    logs: 'Log data',
    percent: 50,
    tickertext: 'Yo',
  },
};

// Produce a function 'genStory' that can generate a story from hand-tweaked properties
const boxProps = {boxtype: 'medium'};
let genStory = getStoryGenerator(TestComponent, boxProps, testData);

export const test = () =>
  genStory({
    operations: {
      logs: text('log data', 'enter'),
      tickertext: text('ticker', ''),
      percent: number('Progress', 80),
    },
  });
