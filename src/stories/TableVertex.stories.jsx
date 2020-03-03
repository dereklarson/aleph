// @format
import {genStoryEntry, getStoryGenerator} from './testHelpers';
import {excitedState} from './testStates';
import TableVertex from '@diagram/TableVertex';

const TestComponent = TableVertex;
// Generate a Storybook entry based on the following key args (order, component, state)
export default genStoryEntry(13, TestComponent, excitedState);

// testData should containing a baseline object of properties to pass into the component
export const testData = {
  uid: 'Test Node',
  libAssn: [
    ['total_calories', 'Int'],
    ['energy_density', 'Float'],
    ['Yurp', 'String!'],
  ],
  styleProps: {
    highlighted: false,
    isDragging: false,
    building: false,
    prepared: false,
  },
};

// Produce a function 'genStory' that can generate a story from hand-tweaked properties
// const boxProps = {squaresize: 300};

const boxProps = {boxtype: 'medium'};
let genStory = getStoryGenerator(TestComponent, boxProps, testData);
export const names = () => genStory({uid: 'Test'});
