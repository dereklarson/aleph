// @format
import {vertexDataFromPaths} from './vertexHelpers';
import _ from 'lodash';

export const library_sample = {
  sample: {
    name: 'sample',
    dependencies: [],
    text: '#Functional text will be here\n',
  },
};

export const initState = {
  // Test variables
  dagre: false,
  // Context
  focus: null,
  location: 'docker',
  editing: false,
  editor: null,
  // Operations
  tickertext: 'Ticker',
  percent: 100,
  building: null,
  build_orders: [],
  build_cache: [],
  // Core
  docker_vertices: [],
  pipeline_vertices: vertexDataFromPaths([['Parent', 'Child']]),
  data_vertices: [],
  configuration_vertices: vertexDataFromPaths([
    ['Control', 'Worker'],
    ['Control', 'Dev'],
  ]),
  docker_library: _.clone(library_sample),
  pipeline_library: _.clone(library_sample),
  data_library: _.clone(library_sample),
  configuratino_library: _.clone(library_sample),
  docker_saved: {},
  pipeline_saved: {},
  data_saved: {},
  configuration_saved: {},
  docker_fulltext: new Map(),
  pipeline_fulltext: new Map(),
  data_fulltext: new Map(),
  configuration_fulltext: new Map(),
};

export const tutorialInitialState = {
  dagre: false,
  focus: null,
  location: 'docker',
  tickertext: 'Ticker',
  percent: 100,
  build_orders: [],
  docker_vertices: [],
  docker_fulltext: new Map(),
};

export const noBuildState = {
  building: null,
  build_orders: [],
  tickertext: 'Ticker',
  percent: 100,
};
