// @format
import React from 'react';
import {Provider} from 'react-redux';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {action} from '@storybook/addon-actions';
import {withKnobs} from '@storybook/addon-knobs';
import {muiTheme} from 'storybook-addon-material-ui';
import Divbox from './Divbox';
import Vertices from '../diagram/Vertices';
import {excitedState} from './testStates';

const TestComponent = Vertices;

// A super-simple mock of a redux store
const store = {
  getState: () => excitedState,
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

function genTest(props, boxprops = {boxtype: 'medium'}) {
  return (
    <Divbox {...boxprops}>
      <TestComponent {...testData} {...props} />
    </Divbox>
  );
}

export const test = () => genTest({name: 'diff'});
