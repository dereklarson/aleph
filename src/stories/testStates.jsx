// @format
import _ from 'lodash';
import {vertexDataFromPaths} from '../utils/vertexHelpers';
import {genLibrary} from '../utils/stateHelpers';

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
