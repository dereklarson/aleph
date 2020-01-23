// @format
import {vertexDataFromPaths} from './vertexHelpers';
import {genLocationData, genLibrary} from './stateHelpers';
import _ from 'lodash';

// We have four main categories of state data: context, ops, cache, and location
// context: describes state of the display, such as what's visible now
// ops: describes things that might happen in the background
// cache: useful optimization data
// location: data associated with diagram-building based on the current location

export const blankContext = {
  dagre: false,
  focus: null,
  location: 'docker',
  editing: false,
  editor: null,
  texting: false,
  entry_schema: {},
  func: () => 0,
};

export const blankOperations = {
  tickertext: 'Ticker',
  percent: 100,
  building: null,
  build_orders: [],
};

export const blankCache = {
  build_cache: [],
};

const locations = ['docker', 'pipeline', 'data', 'configuration'];
const locationData = genLocationData(locations, {});

export const blankState = {
  ..._.cloneDeep(blankContext),
  ..._.cloneDeep(blankOperations),
  ..._.cloneDeep(blankCache),
  ..._.cloneDeep(locationData),
};

// State we would first see if nothing else is loaded via Axios
export const initState = {
  ..._.cloneDeep(blankState),
  ...genLibrary(locations),
  pipeline_vertices: vertexDataFromPaths([['Parent', 'Child']]),
  configuration_vertices: vertexDataFromPaths([
    ['Control', 'Worker'],
    ['Control', 'Dev'],
  ]),
};

// State a tutorial will set prior to running
export const tutorialInitialState = {
  ..._.cloneDeep(blankContext),
  ..._.cloneDeep(blankOperations),
  docker_vertices: [],
  docker_fulltext: new Map(),
};
