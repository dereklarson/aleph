// @format
import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';
import {muiTheme} from 'storybook-addon-material-ui';
import {PureTextEntry} from '../comcom/TextEntry';
import Divbox from './Divbox';

const TestComponent = PureTextEntry;

export default {
  component: TestComponent,
  title: TestComponent.displayName,
  decorators: [withKnobs, muiTheme()],
  excludeStories: /.*Data$/,
};

export const testData = {
  open: true,
  schema: {savename: 1},
};

function genTest(props, boxprops = {boxtype: 'medium'}) {
  return (
    <Divbox {...boxprops}>
      <TestComponent {...testData} {...props} />
    </Divbox>
  );
}

export const test = () => genTest();
export const many = () => genTest({schema: {a: 1, b: 2, c: 3}});
export const god = () => genTest({schema: {savename: 1, godmode: true}});
