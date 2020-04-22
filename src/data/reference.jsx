// @format
import _ from "lodash";
import { globalData, globalDevData } from "@data/global";
import { objGen } from "@utils/helpers";

// We have five main categories of state data: context, ops, cache, config, and location
// context: describes state of the display, such as what's visible now
// ops: describes things that happen in the background, generally axios calls
// cache: useful optimization data
// config: broader settings like the organizational details
// location: data associated with diagram-building based on the current location

export const locations = [
  "configuration",
  "docker",
  "pipeline",
  "data",
  "dash"
];
export const bankTypes = ["styles", "library", "datasets"];

// This defines any further data structuring we need
// objGen: takes a list and generates an object of blank objects with list as keys
const categories = {
  vertices: {},
  associations: objGen(bankTypes),
  battery: objGen(bankTypes),
  corpus: {},
  diagrams: {},
  environment: {
    focus: null,
    testing: false,
    envName: "new_diagram",
    test_output: {}
  }
};

export const blankContext = {
  location: locations[0],
  editing: false,
  schema: { title: "Editing" },
  editfunc: () => 0,
  focus: null,
  name: "new diagram"
};

export const blankOperations = {
  tickertext: "Ticker",
  percent: 100,
  building: null,
  build_orders: [],
  logs: ""
};

export const blankCache = {
  build: []
};

export const blankConfig = {
  themeName: "dark",
  organization: {
    name: "<Org Name>",
    repository: null,
    uid: "",
    local: null
  }
};

function genCoreData(categories, locations, globalData) {
  let output = {};
  for (const [category, def] of Object.entries(categories)) {
    let global = _.get(globalData, category, {});
    output[category] = locations.reduce((data, name) => {
      data[name] = _.cloneDeep(def);
      Object.assign(data[name], global);
      return data;
    }, {});
  }
  return output;
}

// This is a complete, empty state representation
export const blankState = {
  context: _.cloneDeep(blankContext),
  operations: _.cloneDeep(blankOperations),
  cache: _.cloneDeep(blankCache),
  config: _.cloneDeep(blankConfig),
  ...genCoreData(categories, locations, globalData)
};

// State we would first see if nothing else is loaded via Axios
export const prodInitialState = {
  ..._.cloneDeep(blankState)
};

// For development, we want a 'production' state with a useful initialization
// area we are working on, which is set here
export const stagingInitialState = {
  ...prodInitialState,
  context: { ...blankState.context, location: "docker" }
};

export const devInitialState = {
  ...stagingInitialState,
  ...genCoreData(categories, locations, globalDevData),
  config: {
    ...blankConfig,
    organization: { name: "Development Server" }
  }
};

function setInitialState(env) {
  if (env === "development") return devInitialState;
  else {
    return stagingInitialState;
  }
  // else return prodInitialState;
}

console.log("Mode:", process.env.NODE_ENV);
export const initState = setInitialState(process.env.NODE_ENV);
console.log("Initial State:", initState);
