// @format
import React from 'react';
import {Provider} from 'react-redux';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {action} from '@storybook/addon-actions';
import {withKnobs} from '@storybook/addon-knobs';
import {muiTheme} from 'storybook-addon-material-ui';
import Divbox from './Divbox';
import Workspace from '../Workspace';
import {initState} from '../utils/stateReference';

const TestComponent = Workspace;

// A super-simple mock of a redux store
const store = {
  getState: () => initState,
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

export const testData = {};

function genTest(props, boxprops = {squaresize: 1200}) {
  return (
    <Divbox {...boxprops}>
      <TestComponent {...testData} {...props} />
    </Divbox>
  );
}

export const conf_small = () => genTest({});
