// @format
import {vertexDataFromPaths} from '@utils/vertex';
import {genCoreData, genGreatLibrary} from '@utils/state';
import _ from 'lodash';

// We have five main categories of state data: context, ops, cache, config, and location
// context: describes state of the display, such as what's visible now
// ops: describes things that might happen in the background
// cache: useful optimization data
// config: broader settings like the organizational details
// location: data associated with diagram-building based on the current location

export const blankContext = {
  dagre: false,
  theme: 'dark',
  focus: null,
  location: 'docker',
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
  vertices: vertexDataFromPaths([['parent', 'child']]),
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
  ..._.cloneDeep(locationData),
};

// State we would first see if nothing else is loaded via Axios
export const initState = {
  ..._.cloneDeep(blankState),
  library: genGreatLibrary(locations),
};

// State a tutorial will set prior to running
export const tutorialInitialState = {
  context: _.cloneDeep(blankContext),
  operations: _.cloneDeep(blankOperations),
  vertices: {},
};
