import React from 'react';
import { Provider } from 'react-redux';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import {muiTheme} from 'storybook-addon-material-ui';
import Divbox from './Divbox'
import { PureDiagram } from '../diagram/Diagram';
import { coveredState } from './testStates';

const TestComponent = PureDiagram;

// A super-simple mock of a redux store
const store = {
  getState: () => coveredState,
  subscribe: () => 0,
  dispatch: action('dispatch'),
};

const providers = story => (
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      {story()}
    </DndProvider>
  </Provider>
)

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
  }
}

function genTest(props, boxprops={squaresize: 800}) {
  return (
    <Divbox {...boxprops} ><TestComponent {...testData} {...props} /></Divbox>
  )
}

export const test = () => genTest({});
export const dagre = () => genTest({
  activity: {focus: 1, location: 'docker', prepared: [0], dagre: true}});
