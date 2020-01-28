// @format
import {genStoryEntry, getStoryGenerator} from './testHelpers';
import {excitedState} from './testStates';
import {PureTextEntry} from '@common/TextEntry';

const TestComponent = PureTextEntry;
// Generate a Storybook entry based on the following key args (order, component, state)
export default genStoryEntry(20, TestComponent, excitedState);

// testData should containing a baseline object of properties to pass into the component
export const testData = {
  open: true,
  schema: {
    title: 'Saving Diagram',
    keys: {
      savename: 1,
    },
  },
};

// Produce a function 'genStory' that can generate a story from hand-tweaked properties
const boxProps = {boxtype: 'medium'};
let genStory = getStoryGenerator(TestComponent, boxProps, testData);

export const test = () => genStory();
export const many = () =>
  genStory({schema: {title: 'Z', keys: {a: 1, b: 2, c: 3}}});
export const god = () =>
  genStory({schema: {title: 'God', godmode: true, keys: {}}});
