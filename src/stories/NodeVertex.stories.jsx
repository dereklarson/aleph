// @format
import {text} from '@storybook/addon-knobs';
import {genStoryEntry, getCollageGenerator} from './testHelpers';
import {excitedState} from './testStates';
import {PureNodeVertex} from '@diagram/NodeVertex';

const TestComponent = PureNodeVertex;
// Generate a Storybook entry based on the following key args (order, component, state)
export default genStoryEntry(12, TestComponent, excitedState);

// testData should containing a baseline object of properties to pass into the component
export const testData = {
  uid: 'test_node',
  location: 'docker',
  styles: excitedState.battery.docker.styles,
  styleAssns: ['node'],
  library: excitedState.battery.docker.library,
  libAssns: ['react'],
  contextProps: {
    highlighted: false,
    isDragging: false,
    building: false,
    prepared: false,
    isOver: false,
  },
  env: {testing: true, test_output: {}},
};

// Produce a function 'genStory' that can generate a story from hand-tweaked properties
const boxProps = {height: 150, width: 300};
const windowProps = {squaresize: 800};
let genCollage = getCollageGenerator(
  TestComponent,
  windowProps,
  boxProps,
  testData,
);

export const dynamic = () =>
  genCollage([
    {
      uid: text('Uid', 'default'),
      ops: {default: text('Test output', '154.1234')},
    },
  ]);
export const uids = () =>
  genCollage([{uid: ''}, {uid: 'Normal'}, {uid: 'Cornelius Scipio Africanus'}]);
export const associations = () =>
  genCollage([
    {associations: []},
    {associations: ['Cornelius', 'Fabius', 'Julius', 'Quinctius', 'Cato']},
  ]);
export const states = () =>
  genCollage([
    {uid: 'dragging', contextProps: {isDragging: true}},
    {uid: 'highlighed', contextProps: {highlighted: true}},
    {uid: 'building', contextProps: {building: true}},
    {uid: 'prepared', contextProps: {prepared: true}},
    {
      uid: 'testing',
      ops: {testing: true, test_output: {testing: 'abc'}},
      contextProps: {isOver: true},
    },
  ]);
