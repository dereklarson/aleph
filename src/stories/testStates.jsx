// @format
import _ from 'lodash';
import {vertexDataFromPaths} from '../utils/vertexHelpers';
import {genLibrary} from '../utils/stateHelpers';
import {blankState} from '../utils/stateReference';

export const coveredState = {
  building: null,
  small_vertices: vertexDataFromPaths([['Parent', 'Child']]),
  medium_vertices: vertexDataFromPaths([
    ['Ubuntu', 'Python', 'React', 'Flask'],
    ['Ubuntu', 'Python', 'Python_sci', 'gcp', 'JupyterLab'],
    ['Ubuntu', 'Python', 'Python_sci', 'gcp', 'Modeler'],
    ['Ubuntu', 'Python', 'gcp', 'Worker'],
  ]),
  large_vertices: vertexDataFromPaths([
    ['Ubuntu', 'Python', 'React', 'Flask', 'End1'],
    ['Ubuntu', 'Python', 'Python_sci', 'gcp', 'JupyterLab', 'End2'],
    ['Ubuntu', 'Python', 'Python_sci', 'gcp', 'Modeler'],
    ['Ubuntu', 'Python', 'gcp', 'Worker'],
    ['Ubuntu', 'Go', 'Protobuf', 'Work', 'End3'],
    ['Protobuf', 'Service', 'Host'],
  ]),
  small_library: genLibrary(['a']),
  medium_library: genLibrary([
    'a',
    'Ubuntu',
    'JupyterLab',
    'Cornelius Scipio Africanus Maximus',
    'gcp',
    'python',
  ]),
};

export const excitedState = {
  ...blankState,
  dagre: true,
  focus: 0,
  location: 'docker',
  tickertext: 'The most fabulous state in town',
  percent: 80,
  building: 2,
  build_orders: [{id: 1}],
  build_cache: [],
  docker_vertices: _.cloneDeep(coveredState.large_vertices),
  docker_library: _.cloneDeep(coveredState.medium_library),
};
