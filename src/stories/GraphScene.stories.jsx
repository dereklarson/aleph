// @format
import {genStoryEntry, getStoryGenerator} from './testHelpers';
import {excitedState} from './testStates';
import Graph from '@diagram/Graph';

const TestComponent = Graph;
// Generate a Storybook entry based on the following key args (order, component, state)
export default genStoryEntry(7, TestComponent, excitedState);

// testData should containing a baseline object of properties to pass into the component
export const testData = {
  focus: 'child',
  location: 'docker',
  prepared: [1],
  vertices: {
    parent: {
      uid: 'parent',
      children: {child: true},
      parents: {},
      position: {x: 0, y: 0, height: 10, width: 10},
    },
    child: {
      uid: 'child',
      children: {},
      parents: {parent: true},
      position: {x: 10, y: 10, height: 10, width: 10},
    },
  },
};

// Produce a function 'genStory' that can generate a story from hand-tweaked properties
const boxProps = {boxtype: 'medium'};
let genStory = getStoryGenerator(TestComponent, boxProps, testData);

export const test = () => genStory({name: 'diff'});
