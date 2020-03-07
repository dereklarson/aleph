// @format
// import _ from 'lodash';
import {genStoryEntry, getStoryGenerator} from './testHelpers';
import {excitedState, coveredState} from './testStates';
import {PureDiagram} from '@diagram/Diagram';

const TestComponent = PureDiagram;
// Generate a Storybook entry based on the following key args (order, component, state)
export default genStoryEntry(6, TestComponent, excitedState);

// testData should containing a baseline object of properties to pass into the component
const testData = {
  vertices: coveredState.medium_vertices,
  focus: null,
  location: 'docker',
  buildOrders: [],
};

// Produce a function 'genStory' that can generate a story from hand-tweaked properties
const boxProps = {squaresize: 1000};
let genStory = getStoryGenerator(TestComponent, boxProps, testData);

export const med_data = () => genStory({location: 'data'});
export const solo = () => genStory({vertices: coveredState.solo_vertex});
export const pair = () => genStory({vertices: coveredState.pair_vertices});
export const small = () => genStory({vertices: coveredState.small_vertices});
export const med = () => genStory();
export const big = () => genStory({vertices: coveredState.large_vertices});
