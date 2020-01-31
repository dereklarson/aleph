// @format
import _ from 'lodash';
import {genStoryEntry, getStoryGenerator} from './testHelpers';
import {excitedState, coveredState} from './testStates';
import {PureDiagram} from '@diagram/Diagram';

const TestComponent = PureDiagram;
// Generate a Storybook entry based on the following key args (order, component, state)
export default genStoryEntry(6, TestComponent, excitedState);

// testData should containing a baseline object of properties to pass into the component
const testData = {
  vertices: coveredState.medium_vertices,
  activity: {
    focus: null,
    location: 'docker',
    prepared: [],
    dagre: false,
  },
};

const dagreTest = _.cloneDeep(testData);
dagreTest.activity.dagre = true;

// Produce a function 'genStory' that can generate a story from hand-tweaked properties
const boxProps = {squaresize: 2000};
let genStory = getStoryGenerator(TestComponent, boxProps, testData);
let genStoryDagre = getStoryGenerator(TestComponent, boxProps, dagreTest);

export const stack_solo = () => genStory({vertices: coveredState.solo_vertex});
export const dagre_solo = () =>
  genStoryDagre({vertices: coveredState.solo_vertex});
export const stack_pair = () =>
  genStory({vertices: coveredState.pair_vertices});
export const dagre_pair = () =>
  genStoryDagre({vertices: coveredState.pair_vertices});
export const stack_small = () =>
  genStory({vertices: coveredState.small_vertices});
export const dagre_small = () =>
  genStoryDagre({vertices: coveredState.small_vertices});
export const stack_med = () => genStory();
export const dagre_med = () => genStoryDagre();
export const stack_big = () =>
  genStory({vertices: coveredState.large_vertices});
export const dagre_big = () =>
  genStoryDagre({vertices: coveredState.large_vertices});
