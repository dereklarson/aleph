// @format
import _ from 'lodash';
import {vertexDataFromPaths} from '@utils/vertex';
import {genLibrary} from '@utils/state';
import {blankState} from '@data/reference';

export const coveredState = {
  building: null,
  small_vertices: vertexDataFromPaths([
    ['Parent', 'Child1'],
    ['Parent', 'Child2'],
  ]),
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
  large_diagrams: {a: {}, b: {}, c: {}, d: {}, e: {}, f: {}},
};

export const sectionedVertices = {
  vertices: {
    present: {
      docker: [
        {
          children: [1],
          name: 'ubuntu',
          parents: [],
          sections: ['ubuntu'],
        },
        {
          children: [],
          name: 'python',
          parents: [0],
          sections: ['python'],
        },
      ],
    },
  },
  library: {docker: genLibrary(['ubuntu', 'python', 'capnproto'])},
};

export const sectionState = {
  ...blankState,
  ...sectionedVertices,
};

export const excitedState = {
  ...blankState,
  config: {organization: {name: 'Top Dog'}},
  context: {...blankState.context, dagre: true, focus: 0},
  operations: {
    ...blankState.operations,
    tickertext: 'The most fabulous state in town',
    percent: 80,
    building: 2,
    build_orders: [{id: 1}],
  },
  vertices: {present: {docker: _.cloneDeep(coveredState.large_vertices)}},
  library: {docker: _.cloneDeep(coveredState.medium_library)},
};
