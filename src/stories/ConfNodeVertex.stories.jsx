import React from 'react';
import {muiTheme} from 'storybook-addon-material-ui';
import ConfigNodeVertex from '../diagram/ConfigNodeVertex';
import Divbox from './Divbox'

const TestComponent = ConfigNodeVertex

export default {
  component: TestComponent,
  title: TestComponent.displayName,
  //decorators: [withKnobs, muiTheme()],
  decorators: [muiTheme()],
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
  for (const props of proplist.values()) {
    testDisplay.push(
      <Divbox {...boxprops} ><TestComponent {...testData} {...props} /></Divbox>
    );
  }
  return ( <Divbox squaresize={800} > {testDisplay} </Divbox>)
}

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
export const test = () => <TestComponent {...testData} name='ass' />
