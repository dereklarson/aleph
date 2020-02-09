// @format
// import undoable from 'redux-undo';
import _ from 'lodash';
import {vertexDataFromPaths} from '@utils/vertex';
import {genSlice, stateLoc} from './tools';

const configSlice = genSlice('config');
const operationsSlice = genSlice('operations');
const cacheSlice = genSlice('cache');
const contextSlice = genSlice('context');
const datasetsSlice = genSlice('datasets');

const diagramsReducers = {
  removeDiagram(state, {payload: {location, uid}}) {
    delete state[location][uid];
  },
};
const diagramsSlice = genSlice('diagrams', diagramsReducers);
export const {removeDiagram} = diagramsSlice.actions;

const libraryReducers = {
  writeText(state, {payload: {location, uid, text}}) {
    state[location][uid].text = text;
  },
};
const librarySlice = genSlice('library', libraryReducers);
export const {writeText} = librarySlice.actions;

const corpusReducers = {
  loadDiagramCorpus(state, {payload: {location, uid, content}}) {
    if (_.has(content, 'corpus')) {
      Object.assign(state[location], content.corpus);
    }
  },
  setText(state, {payload: {location, uid, text}}) {
    if (!_.has(state[location], uid)) {
      state[location][uid] = {};
    }
    state[location][uid].text = text;
  },
  clearText(state, {payload: {location, uid}}) {
    if (_.has(state[location], uid)) {
      delete state[location][uid];
    }
  },
};
const corpusSlice = genSlice('corpus', corpusReducers);
export const {loadDiagramCorpus, setText, clearText} = corpusSlice.actions;

const associationsReducers = {
  loadDiagramAssociations(state, {payload: {location, uid, content}}) {
    if (_.has(content, 'associations')) {
      Object.assign(state[location], content.associations);
    }
  },
  addAssociation(state, {payload: {location, uid, association}}) {
    if (!_.has(state[location], uid)) {
      state[location][uid] = [];
    }
    state[location][uid].push(association);
  },
  removeAssociation(state, {payload: {location, uid, association}}) {
    let index = state[location][uid].indexOf(association);
    if (index >= 0) state[location][uid].splice(index, 1);
  },
  removeAllAssociations(state, {payload: {location, uid}}) {
    state[location][uid] = [];
  },
  relinkAssociations(state, {payload: {location, uid, newId}}) {
    let associations = state[location][uid];
    delete Object.assign(state[location], {[newId]: associations})[uid];
  },
};
const associationsSlice = genSlice('associations', associationsReducers);
export const {
  loadDiagramAssociations,
  addAssociation,
  removeAssociation,
  removeAllAssociations,
  relinkAssociations,
} = associationsSlice.actions;

const vertexReducers = {
  loadDiagramVertices(state, {payload: {location, uid, content}}) {
    if (_.has(content, 'paths')) {
      Object.assign(state[location], vertexDataFromPaths(content.paths));
    } else if (_.has(content, 'vertices')) {
      Object.assign(state[location], content.vertices);
    }
  },
  addVertex(state, {payload: {location, uid}}) {
    // TODO figure out function to "create first uid"
    if (_.has(state[location], uid)) {
      uid = uid + 'x';
    }
    state[location][uid] = {
      uid: uid,
      children: {},
      parents: {},
    };
  },
  removeVertex(state, {payload: {location, uid}}) {
    let vertex = state[location][uid];
    //Remove each parent link and child link, then delete the vertex
    _.keys(vertex.parents).forEach(key => {
      delete state[location][key].children[vertex.uid];
    });
    _.keys(vertex.children).forEach(key => {
      delete state[location][key].parents[vertex.uid];
    });
    delete state[location][vertex.uid];
  },
  renameVertex(state, {payload: {location, uid, newId}}) {
    let vertex = state[location][uid];
    vertex['uid'] = newId;
    //Swap each parent link and child link, then swap the vertex
    _.keys(vertex.parents).forEach(key => {
      delete state[location][key].children[uid];
      state[location][key].children[newId] = true;
    });
    _.keys(vertex.children).forEach(key => {
      delete state[location][key].parents[uid];
      state[location][key].parents[newId] = true;
    });
    delete Object.assign(state[location], {[newId]: vertex})[uid];
  },
  linkVertex(state, {payload: {location, child, parent}}) {
    state[location][child].parents[parent] = true;
    state[location][parent].children[child] = true;
  },
  unlinkVertex(state, {payload: {location, child, parent}}) {
    delete state[location][child].parents[parent];
    delete state[location][parent].children[child];
  },
};

const verticesSlice = genSlice('vertices', vertexReducers);
export const {
  loadDiagramVertices,
  addVertex,
  removeVertex,
  renameVertex,
  linkVertex,
  unlinkVertex,
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
  associations: associationsSlice.actions.modify_associations,
  datasets: datasetsSlice.actions.modify_datasets,
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
  associations: associationsSlice.reducer,
  datasets: datasetsSlice.reducer,
});

export default rootReducer;
