// @format
import _ from 'lodash';
import {vertexDataFromPaths} from '@utils/vertex';
import {genCoreData} from '@utils/state';
import {genBattery} from '@data/dev';
import {objGen} from '@utils/helpers';

// We have five main categories of state data: context, ops, cache, config, and location
// context: describes state of the display, such as what's visible now
// ops: describes things that happen in the background, generally axios calls
// cache: useful optimization data
// config: broader settings like the organizational details
// location: data associated with diagram-building based on the current location

export const locations = ['configuration', 'docker', 'pipeline', 'data'];
export const bankTypes = ['styles', 'library', 'datasets'];
// export const locations = ['flow_diagram'];

export const blankContext = {
  themeName: 'dark',
  focus: null,
  location: locations[0],
  name: 'new diagram',
  editing: false,
  schema: {title: 'Editing'},
  editfunc: () => 0,
};

export const blankOperations = {
  tickertext: 'Ticker',
  percent: 100,
  building: null,
  build_orders: [],
  testing: false,
  test_output: {},
  stdout: '',
};

export const blankCache = {
  build: [],
};

export const blankConfig = {
  organization: {
    name: '<Org Name>',
    repository: null,
    uid: '',
    local: null,
  },
};

const blankCategories = {
  vertices: {},
  associations: objGen(bankTypes),
  battery: objGen(bankTypes),
  corpus: {},
  diagrams: {},
};
const blankLocationData = genCoreData(blankCategories, locations);

// This is a complete, empty state representation
export const blankState = {
  context: _.cloneDeep(blankContext),
  operations: _.cloneDeep(blankOperations),
  cache: _.cloneDeep(blankCache),
  config: _.cloneDeep(blankConfig),
  ..._.cloneDeep(blankLocationData),
};

// State we would first see if nothing else is loaded via Axios
export const prodInitialState = {
  ..._.cloneDeep(blankState),
};

// For development, we want a 'production' state with a useful initialization
// area we are working on, which is set here
export const stagingInitialState = {
  ..._.cloneDeep(blankState),
  context: {...blankState.context, location: 'docker'},
};

// When in full dev mode (no Flask server) we want some test data available

const devCategories = {
  ..._.cloneDeep(blankCategories),
  vertices: vertexDataFromPaths([['parent', 'child']]),
  associations: {
    library: {parent: ['parent'], child: ['child', 'friend']},
    styles: {parent: ['blue_square'], child: ['green_triangle']},
    datasets: {},
  },
};

const devLocationData = genCoreData(devCategories, locations);
export const devInitialState = {
  ..._.cloneDeep(blankState),
  ...devLocationData,
  battery: genBattery(locations),
};

// State a tutorial will set prior to running
export const tutorialInitialState = {
  context: _.cloneDeep(blankContext),
  operations: _.cloneDeep(blankOperations),
  vertices: {},
};

function setInitialState(env) {
  if (env === 'development') return devInitialState;
  else return stagingInitialState;
  // else return prodInitialState;
}

console.log('Mode:', process.env.NODE_ENV);
export const initState = setInitialState(process.env.NODE_ENV);
console.log('Initial State:', initState);
