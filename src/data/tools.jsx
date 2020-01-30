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
  console.log(slice);
  return slice;
}

export function stateLoc(state, payload) {
  return state[payload.location][payload.uid];
}
