// @format
import {genStoryEntry, getStoryGenerator} from './testHelpers';
import {excitedState} from './testStates';
import TableVertex from '@diagram/TableVertex';

const TestComponent = TableVertex;
// Generate a Storybook entry based on the following key args (order, component, state)
export default genStoryEntry(13, TestComponent, excitedState);

const createData = (field, datatype) => ({field, datatype});

// testData should containing a baseline object of properties to pass into the component
export const testData = {
  uid: 'Test Node',
  rows: [
    createData('total_calories', 'Int'),
    createData('energy_density', 'Float'),
    createData('Yurp', 'String!'),
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
