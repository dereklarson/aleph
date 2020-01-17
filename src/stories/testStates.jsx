// @format
import {vertexDataFromPaths} from '../utils//vertexHelpers';

export const coveredState = {
  building: null,
  simple_vertices: vertexDataFromPaths([['Parent', 'Child']]),
  medium_vertices: vertexDataFromPaths([
    ['Ubuntu', 'Python', 'React', 'Flask'],
    ['Ubuntu', 'Python', 'Python_sci', 'gcp', 'JupyterLab'],
    ['Ubuntu', 'Python', 'Python_sci', 'gcp', 'Modeler'],
    ['Ubuntu', 'Python', 'gcp', 'Worker'],
  ]),
};
