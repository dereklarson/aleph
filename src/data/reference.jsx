// @format
import {vertexDataFromPaths} from '@utils/vertex';
import {genCoreData, genGreatLibrary} from '@utils/state';
import _ from 'lodash';

// We have five main categories of state data: context, ops, cache, config, and location
// context: describes state of the display, such as what's visible now
// ops: describes things that happen in the background, generally axios calls
// cache: useful optimization data
// config: broader settings like the organizational details
// location: data associated with diagram-building based on the current location

export const blankContext = {
  themeName: 'dark',
  focus: null,
  location: 'docker',
  name: '',
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
  associations: {},
  library: {},
  corpus: {},
  diagrams: {},
};
const locations = ['docker', 'pipeline', 'data', 'configuration'];
const blankLocationData = genCoreData(blankCategories, locations);

// This is a complete, empty state representation
export const blankState = {
  context: _.cloneDeep(blankContext),
  operations: _.cloneDeep(blankOperations),
  cache: _.cloneDeep(blankCache),
  config: _.cloneDeep(blankConfig),
  datasets: {},
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
  context: {...blankState.context, location: 'config'},
};

// When in full dev mode (no Flask server) we want some test data available

const devCategories = {
  ..._.cloneDeep(blankCategories),
  vertices: vertexDataFromPaths([['parent', 'child']]),
  associations: {parent: ['parent'], child: ['child', 'friend']},
};

const devLocationData = genCoreData(devCategories, locations);
export const devInitialState = {
  ..._.cloneDeep(blankState),
  ...devLocationData,
  library: genGreatLibrary(locations),
  associations: {
    ..._.cloneDeep(devLocationData.associations),
    data: {
      parent: [
        ['tableId', 'int!'],
        ['size', 'int'],
        ['name', 'string'],
      ],
    },
  },
};

// State a tutorial will set prior to running
export const tutorialInitialState = {
  context: _.cloneDeep(blankContext),
  operations: _.cloneDeep(blankOperations),
  vertices: {},
};

function setInitialState(env) {
  if (env === 'development') return devInitialState;
  else if (env === 'staging') return stagingInitialState;
  else return prodInitialState;
}

console.log('Mode:', process.env.NODE_ENV);
export const initState = setInitialState(process.env.NODE_ENV);
console.log('Initial State:', initState);
