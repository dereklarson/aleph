// @format
import React from 'react';
import {Provider} from 'react-redux';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {action} from '@storybook/addon-actions';
import {withKnobs, boolean} from '@storybook/addon-knobs';
import {muiTheme} from 'storybook-addon-material-ui';
import Divbox from './Divbox';
import {PureInterface} from '../Interface';
import {blankState} from '../utils/stateReference';
import {coveredState} from './testStates';

const TestComponent = PureInterface;

// A super-simple mock of a redux store
const store = {
  getState: () => ({...blankState, entry_schema: {sample: true}}),
  subscribe: () => 0,
  dispatch: action('dispatch'),
};

const keyMap = {
  DELETE_NODE: ['del', 'backspace'],
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

export const unbounded = () => <TestComponent {...testData} />;
export const dynamic = () =>
  genTest({
    editing: boolean('editing', false),
    texting: boolean('texting', false),
  });
