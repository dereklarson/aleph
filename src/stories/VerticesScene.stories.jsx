// @format
import React from 'react';
import {genStoryEntry, getStoryGenerator} from './testHelpers';
import {excitedState} from './testStates';
import Vertices from '@diagram/Vertices';

const TestComponent = Vertices;
// Generate a Storybook entry based on the following key args (order, component, state)
export default genStoryEntry(5, TestComponent, excitedState);

// testData should containing a baseline object of properties to pass into the component
export const testData = {
  vertices: [
    {
      name: 'parent',
      children: [1],
      parents: [],
      sections: [],
      position: {x: 0, y: 0, height: 10, width: 10},
    },
    {
      name: 'focus child',
      children: [],
      parents: [0],
      sections: [],
      position: {x: 10, y: 10, height: 10, width: 10},
    },
  ],
  activity: {
    focus: 1,
    location: 'docker',
    prepared: [1],
  },
};

// Produce a function 'genStory' that can generate a story from hand-tweaked properties
const boxProps = {boxtype: 'medium'};
let genStory = getStoryGenerator(TestComponent, boxProps, testData);

export const test = () => genStory({name: 'diff'});
