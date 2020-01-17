import React from 'react';
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import {muiTheme} from 'storybook-addon-material-ui';
import {PureTicker} from '../depot/Ticker';
import Divbox from './Divbox'

const TestComponent = PureTicker;


export default {
  component: TestComponent,
  title: TestComponent.displayName,
  decorators: [withKnobs, muiTheme()],
  excludeStories: /.*Data$/,
};

export const testData = {
  logs: 'Log data',
  percent: 50,
  tickertext: 'Yo',
}

function genTest(props, boxprops={boxtype: 'medium'}) {
  return (
    <Divbox {...boxprops} ><TestComponent {...testData} {...props} /></Divbox>
  )
}

export const test = () => genTest({logs: 'diff'});
