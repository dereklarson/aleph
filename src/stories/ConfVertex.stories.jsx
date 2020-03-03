// @format
import {genStoryEntry, getCollageGenerator} from './testHelpers';
import {excitedState} from './testStates';
import ConfigVertex from '@diagram/ConfigVertex';

const TestComponent = ConfigVertex;
// Generate a Storybook entry based on the following key args (order, component, state)
export default genStoryEntry(11, TestComponent, excitedState);

// testData should containing a baseline object of properties to pass into the component
export const testData = {
  name: 'Test Node',
  libAssn: ['react'],
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

export const names = () =>
  genCollage([{uid: ''}, {uid: 'Normal'}, {uid: 'Cornelius Scipio Africanus'}]);
export const associations = () =>
  genCollage([
    {associations: []},
    {associations: ['Cornelius', 'Fabius', 'Julius', 'Quinctius', 'Cato']},
  ]);
export const states = () =>
  genCollage([
    {uid: 'dragging', styleProps: {isDragging: true}},
    {uid: 'highlighed', styleProps: {highlighted: true}},
    {uid: 'building', styleProps: {building: true}},
    {uid: 'prepared', styleProps: {prepared: true}},
  ]);
