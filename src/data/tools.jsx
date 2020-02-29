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
        Object.assign(state, action.payload);
      },
    },
  });
  return slice;
}

export function createText({library, libAssn, corpus, uid}) {
  if (_.has(corpus, uid)) return corpus[uid].text;
  else {
    let text = '';
    libAssn.forEach(associationUid => {
      text += library[associationUid].text;
    });
    return text;
  }
}

export function generateCorpus({baseCorpus, vertices, associations, library}) {
  let output = {};
  _.values(vertices).forEach(vertex => {
    let uid = vertex.uid;
    let localAssoc = associations[uid];
    output[uid] = {
      text: createText({
        library,
        associations: localAssoc,
        corpus: baseCorpus,
        uid,
      }),
    };
  });
  return output;
}

export function getBuildData(state) {
  const location = state.context.location;
  const vertices = state.vertices[location];
  const associations = state.associations[location];
  const library = state.library[location];
  const baseCorpus = state.corpus[location];
  const corpus = generateCorpus({baseCorpus, vertices, associations, library});
  const metadata = {
    build_id: state.context.focus,
    name: state.context.name,
    testing: state.operations.testing,
  };
  return {vertices, corpus, metadata};
}
