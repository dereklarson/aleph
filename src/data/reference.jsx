// @format
// import {vertexDataFromPaths} from '@utils/vertex';
import {genCoreData, genGreatLibrary} from '@utils/state';
import _ from 'lodash';

// We have five main categories of state data: context, ops, cache, config, and location
// context: describes state of the display, such as what's visible now
// ops: describes things that happen in the background, generally axios calls
// cache: useful optimization data
// config: broader settings like the organizational details
// location: data associated with diagram-building based on the current location

export const blankContext = {
  dagre: true,
  theme: 'dark',
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

const categories = {
  // vertices: vertexDataFromPaths([['parent', 'child']]),
  vertices: {},
  associations: {},
  library: {},
  corpus: {},
  diagrams: {},
};
const locations = ['docker', 'pipeline', 'data', 'configuration'];
const locationData = genCoreData(categories, locations, {});

export const blankState = {
  context: _.cloneDeep(blankContext),
  operations: _.cloneDeep(blankOperations),
  cache: _.cloneDeep(blankCache),
  config: _.cloneDeep(blankConfig),
  datasets: {},
  ..._.cloneDeep(locationData),
};

const defaults = {def: ['ubuntu', 'sample']};
// State we would first see if nothing else is loaded via Axios
export const prodInitialState = {
  ..._.cloneDeep(blankState),
  library: genGreatLibrary(locations, defaults),
};

export const devInitialState = {
  ..._.cloneDeep(blankState),
  library: genGreatLibrary(locations, defaults),
};

// State a tutorial will set prior to running
export const tutorialInitialState = {
  context: _.cloneDeep(blankContext),
  operations: _.cloneDeep(blankOperations),
  vertices: {},
};

function setInitialState(env) {
  if (env === 'development') return devInitialState;
  else return prodInitialState;
}

console.log('Mode:', process.env.NODE_ENV);
export const initState = setInitialState(process.env.NODE_ENV);
console.log('Initial State:', initState);
