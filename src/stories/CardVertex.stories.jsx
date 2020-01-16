import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import {muiTheme} from 'storybook-addon-material-ui';
import { PureCardVertex } from '../diagram/CardVertex';
import Divbox from './Divbox'

const TestComponent = PureCardVertex

export default {
  component: TestComponent,
  title: TestComponent.displayName,
  decorators: [withKnobs, muiTheme()],
  excludeStories: /.*Data$/,
};

export const testData = {
  name: 'Test Node',
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
  }
}

function testSet(proplist, boxprops={width: 300, height: 150}) {
  const testDisplay = [];
  for (const [index, props] of proplist.entries()) {
    testDisplay.push(
      <Divbox {...boxprops} ><TestComponent {...testData} {...props} /></Divbox>
    );
  }
  return ( <Divbox squaresize={800} > {testDisplay} </Divbox>)
}

function genTest(props, boxprops={boxtype: 'small'}) {
  return (
    <Divbox {...boxprops} ><TestComponent {...testData} {...props} /></Divbox>
  )
}

export const names = () => testSet(
  [{name: ''}, {name: 'Normal'}, {name: 'Cornelius Scipio Africanus'}]);
export const sections = () => testSet(
  [{sections: []}, {sections: ['Cornelius', 'Fabius', 'Julius', 'Quinctius', 'Cato']}]);
export const dragging = () => genTest({styleProps: {isDragging: true}});
export const highlighted = () => genTest({styleProps: {highlighted: true}});
export const building = () => genTest({styleProps: {building: true}});
export const prepared = () => genTest({styleProps: {prepared: true}});
