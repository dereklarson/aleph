// @format
import {genStoryEntry, getStoryGenerator} from './testHelpers';
import {PureWorkspace} from '@comp/Workspace';
import {excitedState} from './testStates';

const TestComponent = PureWorkspace;
// Generate a Storybook entry based on the following key args (order, component, state)
export default genStoryEntry(4, TestComponent, excitedState);

// testData should containing a baseline object of properties to pass into the component
export const testData = {};

// Produce a function 'genStory' that can generate a story from hand-tweaked properties
const boxProps = {squaresize: 1200};
let genStory = getStoryGenerator(TestComponent, boxProps, testData);

export const conf_small = () => genStory({});
