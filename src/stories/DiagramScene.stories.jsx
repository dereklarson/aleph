// @format
import React from 'react';
import {genStoryEntry, getStoryGenerator} from './testHelpers';
import {excitedState, coveredState} from './testStates';
import {PureDiagram} from '@diagram/Diagram';

const TestComponent = PureDiagram;
// Generate a Storybook entry based on the following key args (order, component, state)
export default genStoryEntry(3, TestComponent, excitedState);

// testData should containing a baseline object of properties to pass into the component
export const testData = {
  vertices: coveredState.medium_vertices,
  activity: {
    focus: null,
    location: 'docker',
    prepared: [1],
    dagre: false,
  },
};

// Produce a function 'genStory' that can generate a story from hand-tweaked properties
const boxProps = {squaresize: 1000};
let genStory = getStoryGenerator(TestComponent, boxProps, testData);

export const stack_small = () =>
  genStory({vertices: coveredState.small_vertices});
export const dagre_small = () =>
  genStory({
    vertices: coveredState.small_vertices,
    activity: {focus: 1, location: 'docker', prepared: [], dagre: true},
  });
export const stack_med = () =>
  genStory({vertices: coveredState.medium_vertices});
export const dagre_med = () =>
  genStory({
    vertices: coveredState.medium_vertices,
    activity: {
      focus: 3,
      location: 'configuration',
      prepared: [0, 1],
      dagre: true,
    },
  });
export const stack_big = () =>
  genStory({vertices: coveredState.large_vertices});
export const dagre_big = () =>
  genStory({
    vertices: coveredState.large_vertices,
    activity: {
      focus: 10,
      location: 'docker',
      prepared: [0, 1, 2, 3],
      dagre: true,
    },
  });
