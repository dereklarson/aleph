// @format
import React from 'react';
import {genStoryEntry, getStoryGenerator} from './testHelpers';
import {coveredState, blankState} from './testStates';
import {excitedState} from './testStates';
import {PureDepot} from '@depot/Depot';

const TestComponent = PureDepot;
// Generate a Storybook entry based on the following key args (order, component, state)
export default genStoryEntry(5, TestComponent, excitedState);

// testData should containing a baseline object of properties to pass into the component
export const testData = {
  library: coveredState.medium_library,
};

// Produce a function 'genStory' that can generate a story from hand-tweaked properties
const boxProps = {squaresize: 600};
let genStory = getStoryGenerator(TestComponent, boxProps, testData);

export const basic = () => genStory();
