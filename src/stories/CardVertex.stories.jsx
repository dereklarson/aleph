// @format
import React from 'react';
import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import {genStoryEntry, getCollageGenerator} from './testHelpers';
import {excitedState} from './testStates';
import {PureCardVertex} from '@diagram/CardVertex';

const TestComponent = PureCardVertex;
// Generate a Storybook entry based on the following key args (order, component, state)
export default genStoryEntry(10, TestComponent, excitedState);

// testData should containing a baseline object of properties to pass into the component
export const testData = {
  name: 'Test name',
  sections: ['react'],
  id: 1,
  cardActions: {
    onEditor: action('Editor'),
    onBuild: action('Build'),
    onClear: action('Clear'),
  },
  styleProps: {
    highlighted: false,
    isDragging: false,
    building: false,
    prepared: false,
  },
};

// Produce a function 'genStory' that can generate a story from hand-tweaked properties
const boxProps = {squaresize: 300};
const windowProps = {squaresize: 800};
let genCollage = getCollageGenerator(
  TestComponent,
  windowProps,
  boxProps,
  testData,
);

export const dynamic = () => (
  <TestComponent {...testData} name={text('name', 'a')} />
);
export const names = () =>
  genCollage([
    {name: 'a'},
    {name: 'Normal'},
    {name: 'Cornelius Scipio Africanus'},
  ]);
export const sections = () =>
  genCollage([
    {sections: []},
    {sections: ['Cornelius', 'Fabius', 'Julius', 'Quinctius', 'Cato']},
  ]);
export const states = () =>
  genCollage([
    {styleProps: {isDragging: true}},
    {styleProps: {highlighted: true}},
    {styleProps: {building: true}},
    {styleProps: {prepared: true}},
  ]);
