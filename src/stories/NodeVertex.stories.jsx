// @format
import React from 'react';
import {text} from '@storybook/addon-knobs';
import {genStoryEntry, getCollageGenerator} from './testHelpers';
import {excitedState} from './testStates';
import NodeVertex from '@diagram/NodeVertex';

const TestComponent = NodeVertex;
// Generate a Storybook entry based on the following key args (order, component, state)
export default genStoryEntry(5, TestComponent, excitedState);

// testData should containing a baseline object of properties to pass into the component
export const testData = {
  name: 'Test Node',
  sections: ['react'],
  id: 1,
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

export const dynamicName = () => genCollage([{name: text('Name', 'Default')}]);
export const names = () =>
  genCollage([
    {name: ''},
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
    {name: 'dragging', styleProps: {isDragging: true}},
    {name: 'highlighed', styleProps: {highlighted: true}},
    {name: 'building', styleProps: {building: true}},
    {name: 'prepared', styleProps: {prepared: true}},
  ]);
