// @format
import React from 'react';
import {text, boolean} from '@storybook/addon-knobs';
import {genStoryEntry, getStoryGenerator} from './testHelpers';
import {excitedState} from './testStates';
import {PureInterface} from '@comp/Interface';

const TestComponent = PureInterface;
// Generate a Storybook entry based on the following key args (order, component, state)
//   Order (+int): when we want to view the story in the Storybook sidebar
//   Component: imported component variable (capital first letter)
//   state: The state of the Redux store we will build from for the test
export default genStoryEntry(1, TestComponent, excitedState);

// testData should containing a baseline object of properties to pass into the component
export const testData = {};
// Produce a function 'genStory' that can generate a story from hand-tweaked properties
const boxProps = {squaresize: 1200};
let genStory = getStoryGenerator(TestComponent, boxProps, testData);

// TESTS
export const unbounded = () => <TestComponent {...testData} />;
export const dynamic = () =>
  genStory({
    themeStr: text('theme', 'dark'),
    editing: boolean('editing', false),
    texting: boolean('texting', false),
  });
