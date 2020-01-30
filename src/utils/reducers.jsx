// @format
import undoable from 'redux-undo';
import _ from 'lodash';
import {vertexDataFromPaths} from './vertexHelpers';
import {genSlice, stateLoc} from './storeUtils';

const configSlice = genSlice('config');
const operationsSlice = genSlice('operations');
const cacheSlice = genSlice('cache');
const contextSlice = genSlice('context');
const diagramsSlice = genSlice('diagrams');

const libraryReducers = {
  writeText(state, action) {
    stateLoc(state, action.payload).text = action.payload.text;
  },
};
const librarySlice = genSlice('library', libraryReducers);
export const {writeText} = librarySlice.actions;

const corpusReducers = {
  setText(state, action) {
    if (!_.has(state[action.payload.location], action.payload.uid)) {
      state[action.payload.location][action.payload.uid] = {};
    }
    stateLoc(state, action.payload).text = action.payload.text;
  },
};
const corpusSlice = genSlice('corpus', corpusReducers);
export const {setText} = corpusSlice.actions;

const vertexReducers = {
  addDiagram(state, action) {
    Object.assign(
      state[action.payload.location],
      vertexDataFromPaths(state, action.payload.vertexgroups),
    );
  },
  addVertex(state, action) {
    let uid = action.payload.uid;
    // TODO figure out function to "create first uid"
    if (_.has(state[action.payload.location], uid)) {
      uid = uid + 'x';
    }
    state[action.payload.location][uid] = {
      uid: uid,
      children: {},
      parents: {},
      sections: [action.payload.uid],
    };
  },
  removeVertex(state, action) {
    let vertex = stateLoc(state, action.payload);
    //Remove each parent link and child link, then delete the vertex
    _.keys(vertex.parents).forEach(key => {
      delete state[action.payload.location][key].children[vertex.uid];
    });
    _.keys(vertex.children).forEach(key => {
      delete state[action.payload.location][key].parents[vertex.uid];
    });
    delete state[action.payload.location][vertex.uid];
  },
  renameVertex(state, action) {
    //TODO
    stateLoc(state, action.payload);
  },
  linkVertex(state, action) {
    let child = state[action.payload.location][action.payload.child];
    let parent = state[action.payload.location][action.payload.parent];
    parent.children[action.payload.child] = true;
    child.parents[action.payload.parent] = true;
  },
  unlinkVertex(state, action) {
    let child = state[action.payload.location][action.payload.child];
    let parent = state[action.payload.location][action.payload.parent];
    delete child.parents[action.payload.parent];
    delete parent.children[action.payload.child];
  },
  addSection(state, action) {
    stateLoc(state, action.payload).sections.push(action.payload.section);
  },
  removeSection(state, action) {
    let sections = stateLoc(state, action.payload).sections;
    let index = sections.indexOf(action.payload.section);
    if (index >= 0) sections.splice(index, 1);
  },
  removeAllSections(state, action) {
    stateLoc(state, action.payload).sections = [];
  },
};

const verticesSlice = genSlice('vertices', vertexReducers);
export const {
  addDiagram,
  addVertex,
  removeVertex,
  renameVertex,
  linkVertex,
  unlinkVertex,
  addSection,
  removeSection,
  removeAllSections,
} = verticesSlice.actions;

const modifiers = {
  cache: cacheSlice.actions.modify_cache,
  config: configSlice.actions.modify_config,
  context: contextSlice.actions.modify_context,
  operations: operationsSlice.actions.modify_operations,
  library: librarySlice.actions.modify_library,
  corpus: corpusSlice.actions.modify_corpus,
  diagrams: diagramsSlice.actions.modify_diagrams,
  vertices: verticesSlice.actions.modify_vertices,
};
export const modify = (name, payload) => modifiers[name](payload);

function combineReducers(reducers) {
  return function(state, action) {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
}

// Give some parts of the store TimeTravel
// const vertices = undoable(verticesbase);

// Combine all reducers
const rootReducer = combineReducers({
  config: configSlice.reducer,
  context: contextSlice.reducer,
  operations: operationsSlice.reducer,
  cache: cacheSlice.reducer,
  corpus: corpusSlice.reducer,
  diagrams: diagramsSlice.reducer,
  library: librarySlice.reducer,
  vertices: verticesSlice.reducer,
});

export default rootReducer;
