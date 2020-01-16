import React from 'react';
import { PureCardVertex } from '../diagram/CardVertex';
import Divbox from './Divbox'

const TestComponent = PureCardVertex

export default {
  component: TestComponent,
  title: TestComponent.displayName,
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

function testSet(proplist, boxprops={boxtype: 'medium'}) {
  const testDisplay = [];
  for (const [index, props] of proplist.entries()) {
    // testDisplay.push(
    //   <Divbox {...boxprops} ><TestComponent {...testData} {...props} /></Divbox>
    // );
    testDisplay.push( <TestComponent {...testData} {...props} />);
  }
  return ( <Divbox {...boxprops} > {testDisplay} </Divbox>)
}

function genTest(props, boxprops={boxtype: 'small'}) {
  return (
    <Divbox {...boxprops} ><TestComponent {...testData} {...props} /></Divbox>
  )
}

export const dtest = () => testSet([{name: ''}, {name: '1'}]);
export const noName = () => genTest({name: ''});
export const longName = () => genTest({name: 'Cornelius Scipio Africanus'});
export const noSections = () => genTest({sections: []});
export const manySections = () => genTest(
  {sections: ['Cornelius', 'Fabius', 'Julius', 'Quinctius', 'Cato']});
export const dragging = () => genTest({styleProps: {isDragging: true}});
export const highlighted = () => genTest({styleProps: {highlighted: true}});
export const building = () => genTest({styleProps: {building: true}});
export const prepared = () => genTest({styleProps: {prepared: true}});
