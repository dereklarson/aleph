// @format
import _ from 'lodash';
import {vertexDataFromPaths} from '@utils/vertex';
import {genLibrary} from '@utils/state';
import {blankState} from '@data/reference';

export const coveredState = {
  building: null,
  solo_vertex: vertexDataFromPaths([['solo']]),
  pair_vertices: vertexDataFromPaths([['parent', 'child']]),
  small_vertices: vertexDataFromPaths([
    ['parent', 'child1'],
    ['parent', 'child2'],
  ]),
  medium_vertices: vertexDataFromPaths([
    ['ubuntu', 'python', 'react', 'flask'],
    ['ubuntu', 'python', 'gcp', 'worker'],
  ]),
  large_vertices: vertexDataFromPaths([
    ['ubuntu', 'python', 'React', 'flask', 'End1'],
    ['ubuntu', 'python', 'python_sci', 'gcp', 'jupyterLab', 'end2'],
    ['ubuntu', 'python', 'python_sci', 'gcp', 'modeler'],
    ['ubuntu', 'python', 'gcp', 'worker'],
    ['ubuntu', 'go', 'protobuf', 'work', 'end3'],
    ['protobuf', 'service', 'host'],
  ]),
  small_library: genLibrary(['a']),
  medium_library: genLibrary([
    'a',
    'ubuntu',
    'jupyterLab',
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
          children: {python: true},
          uid: 'ubuntu',
          parents: [],
          sections: ['ubuntu'],
        },
        {
          children: [],
          uid: 'python',
          parents: {ubuntu: true},
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

export const testOutput = {
  test_output: {
    ubuntu:
      'Newlines\n(User1, 1452343234663, 23)\n(User2, 19873846372, 35)\n...\n...',
    python: 'This test failed to yield any results',
    gcp: '',
    worker:
      'This result is considerably longer than average, which tests wordwrap and size, as well as generally just being as annoying as possible to represent on the screen in any kind of reasonable way',
  },
};

export const excitedState = {
  ...blankState,
  config: {organization: {name: 'Top Dog'}},
  context: {...blankState.context, dagre: true, focus: 0},
  operations: {
    ...blankState.operations,
    ...testOutput,
    testing: true,
    tickertext: 'The most fabulous state in town',
    percent: 80,
    building: 2,
    build_orders: [{id: 1}],
  },
  vertices: {docker: _.cloneDeep(coveredState.large_vertices)},
  library: {docker: _.cloneDeep(coveredState.medium_library)},
  diagrams: {docker: _.cloneDeep(coveredState.large_diagrams)},
};
