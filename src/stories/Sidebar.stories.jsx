// @format
import {genStoryEntry, getStoryGenerator} from './testHelpers';
import {coveredState, excitedState} from './testStates';
import {PureSidebar} from '@sidebar/Sidebar';

const TestComponent = PureSidebar;
// Generate a Storybook entry based on the following key args (order, component, state)
export default genStoryEntry(3, TestComponent, {
  ...excitedState,
  docker_diagrams: coveredState.large_diagrams,
});

// testData should containing a baseline object of properties to pass into the component
export const testData = {
  location: excitedState.location,
};

// Produce a function 'genStory' that can generate a story from hand-tweaked properties
const boxProps = {squaresize: 800};
let genStory = getStoryGenerator(TestComponent, boxProps, testData);

export const basic = () => genStory({});
export const scroll = () => genStory({style: {maxHeight: 500}});
