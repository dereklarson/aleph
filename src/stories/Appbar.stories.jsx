// @format
import {action} from '@storybook/addon-actions';
import {genStoryEntry, getStoryGenerator} from './testHelpers';
import {excitedState} from './testStates';
import {PureAppBar} from '@comp/AppBar';

const TestComponent = PureAppBar;
// Generate a Storybook entry based on the following key args (order, component, state)
export default genStoryEntry(2, TestComponent, excitedState);

// testData should containing a baseline object of properties to pass into the component
export const testData = {
  state: excitedState,
  onLoadInputs: action('Load'),
};

// Produce a function 'genStory' that can generate a story from hand-tweaked properties
const boxProps = {squaresize: 1200};
let genStory = getStoryGenerator(TestComponent, boxProps, testData);

export const def = () => genStory({});
