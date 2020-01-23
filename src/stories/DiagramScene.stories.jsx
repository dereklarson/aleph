// @format
import React from 'react';
import {Provider} from 'react-redux';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {action} from '@storybook/addon-actions';
import {withKnobs} from '@storybook/addon-knobs';
import {muiTheme} from 'storybook-addon-material-ui';
import Divbox from './Divbox';
import {PureDiagram} from '../diagram/Diagram';
import {coveredState} from './testStates';

const TestComponent = PureDiagram;

// A super-simple mock of a redux store
const store = {
  getState: () => coveredState,
  subscribe: () => 0,
  dispatch: action('dispatch'),
};

const providers = story => (
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>{story()}</DndProvider>
  </Provider>
);

export default {
  component: TestComponent,
  title: TestComponent.displayName,
  decorators: [withKnobs, muiTheme(), providers],
  excludeStories: /.*Data$/,
};

export const testData = {
  vertices: coveredState.medium_vertices,
  activity: {
    focus: null,
    location: 'docker',
    prepared: [1],
    dagre: false,
  },
};

function genTest(props, boxprops = {squaresize: 800}) {
  return (
    <Divbox {...boxprops}>
      <TestComponent {...testData} {...props} />
    </Divbox>
  );
}

export const stack_small = () =>
  genTest({vertices: coveredState.small_vertices});
export const dagre_small = () =>
  genTest({
    vertices: coveredState.small_vertices,
    activity: {focus: 0, location: 'docker', prepared: [], dagre: true},
  });
export const stack_med = () =>
  genTest({vertices: coveredState.medium_vertices});
export const dagre_med = () =>
  genTest({
    vertices: coveredState.medium_vertices,
    activity: {
      focus: 3,
      location: 'configuration',
      prepared: [0, 1],
      dagre: true,
    },
  });
export const stack_big = () => genTest({vertices: coveredState.large_vertices});
export const dagre_big = () =>
  genTest({
    vertices: coveredState.large_vertices,
    activity: {
      focus: 10,
      location: 'docker',
      prepared: [0, 1, 2, 3],
      dagre: true,
    },
  });
