// @format
import React from 'react';
import {Provider} from 'react-redux';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {action} from '@storybook/addon-actions';
import {withKnobs} from '@storybook/addon-knobs';
import {muiTheme} from 'storybook-addon-material-ui';
import Divbox from './Divbox';

// Mock the Redux store with a prepared test state
// Currently, don't both with dispatching appropriate actions
export function genStore(state) {
  return {
    getState: () => state,
    subscribe: () => 0,
    dispatch: action('dispatch'),
  };
}

export function genProviderDecorator(state) {
  let store = genStore(state);
  function providers(story) {
    return (
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>{story()}</DndProvider>
      </Provider>
    );
  }
  return providers;
}

export function genStoryEntry(storyOrder, TestComponent, state) {
  let providers = genProviderDecorator(state);
  return {
    component: TestComponent,
    title: `${storyOrder}-${TestComponent.displayName.replace('Pure', '')}`,
    decorators: [withKnobs, muiTheme(), providers],
    excludeStories: /.*Data$/,
  };
}

// Generates a single storybook test
export function getTest(TestComponent, props) {
  let {boxprops} = props;
  return (
    <Divbox {...boxprops}>
      <TestComponent {...props} />
    </Divbox>
  );
}

// Generates a single storybook test
export function getStoryGenerator(TestComponent, boxProps, testData) {
  function genStory(testProps, idx = 0) {
    return (
      <Divbox key={idx} {...boxProps}>
        <TestComponent {...testData} {...testProps} />
      </Divbox>
    );
  }
  return genStory;
}

export function getCollageGenerator(
  TestComponent,
  windowProps,
  boxProps,
  testData,
) {
  let genStory = getStoryGenerator(TestComponent, boxProps, testData);
  function genCollage(listOfTestProps) {
    const testDisplay = [];
    for (const [idx, testProps] of listOfTestProps.entries()) {
      testDisplay.push(genStory(testProps, idx));
    }
    return <Divbox {...windowProps}> {testDisplay} </Divbox>;
  }
  return genCollage;
}
