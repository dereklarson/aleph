// @format
import {vertexDataFromPaths} from '../utils//vertexHelpers';

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
};
