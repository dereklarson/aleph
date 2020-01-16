import React from 'react';
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import {muiTheme} from 'storybook-addon-material-ui';
import NodeVertex from '../diagram/NodeVertex';
import Divbox from './Divbox'

const TestComponent = NodeVertex

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
  styleProps: {
    highlighted: false,
    isDragging: false,
    building: false,
    prepared: false,
  }
}

function testSet(proplist, boxprops={width: 100, height: 80}) {
  const testDisplay = [];
  for (const [index, props] of proplist.entries()) {
    testDisplay.push(
      <Divbox {...boxprops} ><TestComponent {...testData} {...props} /></Divbox>
    );
  }
  return ( <Divbox squaresize={800} > {testDisplay} </Divbox>)
}

export const dynamicName = () => testSet([{name: text("Name", "Default")}])
export const names = () => testSet(
  [{name: ''}, {name: 'Normal'}, {name: 'Cornelius Scipio Africanus'}]);
export const sections = () => testSet(
  [{sections: []}, {sections: ['Cornelius', 'Fabius', 'Julius', 'Quinctius', 'Cato']}]);
export const states = () => testSet(
  [{name: 'dragging', styleProps: {isDragging: true}},
   {name: 'highlighed', styleProps: {highlighted: true}},
   {name: 'building', styleProps: {building: true}},
   {name: 'prepared', styleProps: {prepared: true}},
  ]);
