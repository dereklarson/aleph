// @format
import {createSlice} from '@reduxjs/toolkit';
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

export function stateLocnew(state, payload) {
  return state[payload.location];
}

export function stateLoc(state, payload) {
  return state[payload.location][payload.uid];
}
