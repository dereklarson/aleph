// @format
import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';
import {initState} from '@data/reference';

export function genSlice(name, extraReducers = {}) {
  const slice = createSlice({
    name: name,
    initialState: initState[name],
    reducers: {
      ...extraReducers,
      [`modify_${name}`]: function(state, action) {
        let {locator, ...payload} = action.payload;
        if (locator == null) locator = [];
        let stateLoc = state;
        locator.forEach(loc => (stateLoc = stateLoc[loc]));
        Object.assign(stateLoc, payload);
      },
    },
  });
  return slice;
}

export function createText({library, libAssns, corpus, uid}) {
  if (_.has(corpus, uid)) return corpus[uid].text;
  else {
    let text = '';
    libAssns.forEach(associationUid => {
      text += _.get(library, associationUid, {text: ''}).text;
    });
    return text;
  }
}

export function generateCorpus({baseCorpus, vertices, associations, library}) {
  let output = {};
  _.values(vertices).forEach(vertex => {
    let uid = vertex.uid;
    let libAssns = associations[uid];
    output[uid] = {
      text: createText({library, libAssns, corpus: baseCorpus, uid}),
    };
  });
  return output;
}

export function getBuildData(state) {
  const location = state.context.location;
  const vertices = state.vertices[location];
  const associations = state.associations[location].library;
  const library = state.battery[location].library;
  const baseCorpus = state.corpus[location];
  const corpus = generateCorpus({baseCorpus, vertices, associations, library});
  const metadata = {
    build_id: state.environment[state.context.location].focus,
    name: state.environment[state.context.location].envName,
    testing: state.environment[state.context.location].testing,
  };
  return {vertices, corpus, metadata};
}
