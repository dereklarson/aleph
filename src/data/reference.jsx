// @format
import {vertexDataFromPaths} from '@utils/vertex';
import {genCoreData, genGreatLibrary} from '@utils/state';
import _ from 'lodash';

// We have five main categories of state data: context, ops, cache, config, and location
// context: describes state of the display, such as what's visible now
// ops: describes things that happen in the background, generally axios calls
// cache: useful optimization data
// config: broader settings like the organizational details
// location: data associated with diagram-building based on the current location

export const locations = ['configuration', 'docker', 'pipeline', 'data'];
// export const locations = ['flow_diagram'];

export const blankContext = {
  themeName: 'dark',
  focus: null,
  location: locations[0],
  name: 'new diagram',
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

const blankCategories = {
  vertices: {},
  associations: {library: {}, styles: {}, datasets: {}},
  library: {},
  styles: {},
  datasets: {},
  corpus: {},
  diagrams: {},
};
const blankLocationData = genCoreData(blankCategories, locations);

// This is a complete, empty state representation
export const blankState = {
  context: _.cloneDeep(blankContext),
  operations: _.cloneDeep(blankOperations),
  cache: _.cloneDeep(blankCache),
  config: _.cloneDeep(blankConfig),
  ..._.cloneDeep(blankLocationData),
};

// State we would first see if nothing else is loaded via Axios
export const prodInitialState = {
  ..._.cloneDeep(blankState),
};

// For development, we want a 'production' state with a useful initialization
// area we are working on, which is set here
export const stagingInitialState = {
  ..._.cloneDeep(blankState),
  context: {...blankState.context, location: 'docker'},
};

// When in full dev mode (no Flask server) we want some test data available

const devCategories = {
  ..._.cloneDeep(blankCategories),
  vertices: vertexDataFromPaths([['parent', 'child']]),
  associations: {
    library: {parent: ['parent'], child: ['child', 'friend']},
    styles: {},
  },
};

const devLocationData = genCoreData(devCategories, locations);
export const devInitialState = {
  ..._.cloneDeep(blankState),
  ...devLocationData,
  library: genGreatLibrary(locations),
  styles: {
    ..._.cloneDeep(blankState.styles),
    flow_diagram: {
      blue_square: {
        uid: 'blue_square',
        type: 'shape',
        text: '{"backgroundColor": "blue", "height": "80px", "width": "80px"}',
      },
      red_circle: {
        uid: 'red_circle',
        type: 'shape',
        text: `{"backgroundColor": "red",
        "borderRadius": "50%",
        "height": "80px",
        "width": "80px"
      }`,
      },
      green_triangle: {
        uid: 'green_triangle',
        type: 'shape',
        text: `{"backgroundColor": "transparent",
      "width": "80px",
      "height": "0px",
      "padding": "0",
      "borderRadius": "0",
      "borderLeft": "25px solid transparent",
      "borderRight": "25px solid transparent",
      "borderBottom": "80px solid red"
      }`,
      },
      diamond: {
        uid: 'diamond',
        type: 'shape',
        text: `{"backgroundColor": "transparent",
        "borderRadius": "0",
        "height": "0px",
        "width": "0px",
        "top": "-50px",
        "position": "relative",
        "border": "50px solid transparent",
        "borderBottom": "80px solid red",
        "'&::after'": {
          "height": "0px",
          "width": "0px",
          "content": "''",
          "position": "absolute",
          "border": "50px solid transparent",
          "borderTop": "70px solid red",
          "top": "70px",
          "left": "-50px"
        }
      }`,
      },
      pointer: {
        uid: 'pointer',
        type: 'shape',
        text: `{"backgroundColor": "red",
        "borderRadius": "0",
      "width": "80px",
      "height": "20px",
      "position": "relative",
      "&::after": {
        "content": "",
        "position": "absolute",
        "left": "0",
        "bottom": "0",
        "width": "0",
        "height": "0",
        "borderLeft": "20px solid white",
        "borderTop": "20px solid transparent",
        "borderBottom": "20px solid transparent"
      },
      "&::before": {
        "content": "",
        "position": "absolute",
        "right": "-20px",
        "bottom": "0",
        "width": "0",
        "height": "0",
        "borderLeft": "20px solid red",
        "borderTop": "20px solid transparent",
        "borderBottom": "20px solid transparent"
      }
    }`,
      },
    },
  },
  associations: {
    ..._.cloneDeep(devLocationData.associations),
    flow_diagram: {
      library: {},
      styles: {
        parent: ['green_triangle'],
        child: ['diamond'],
      },
    },
    data: {
      library: {
        parent: [
          ['tableId', 'int!'],
          ['size', 'int'],
          ['name', 'string'],
        ],
      },
      styles: {},
    },
  },
};

// State a tutorial will set prior to running
export const tutorialInitialState = {
  context: _.cloneDeep(blankContext),
  operations: _.cloneDeep(blankOperations),
  vertices: {},
};

function setInitialState(env) {
  if (env === 'development') return devInitialState;
  else return stagingInitialState;
  // else return prodInitialState;
}

console.log('Mode:', process.env.NODE_ENV);
export const initState = setInitialState(process.env.NODE_ENV);
console.log('Initial State:', initState);
