// @format
import React from 'react';
import {connect} from 'react-redux';
import {List, ListSubheader} from '@material-ui/core';
import _ from 'lodash';
import {generateList} from '../utils/generateList';

function SavedDiagrams({location, saved, onAddSaved, onSetDiagram}) {
  let items = [];
  for (const [name, config] of Object.entries(saved)) {
    let onClick = () => onAddSaved(config.vertexgroups);
    if (_.has(config, `${location}_vertices`)) {
      onClick = () => onSetDiagram(config);
    }
    items.push([name, onClick]);
  }

  return (
    <List>
      <ListSubheader inset>Saved Configurations</ListSubheader>
      {generateList(items, 'Load the diagram called <>', 'assignment')}
    </List>
  );
}

export const setDiagram = state_update => ({
  type: 'MODIFY_STATE',
  update: state_update,
});

export const addSaved = vertexgroups => ({
  type: 'ADD_SAVED',
  vertexgroups: vertexgroups,
});

export default connect(
  state => ({
    location: state.location,
    saved: state[`${state.location}_saved`],
  }),
  dispatch => ({
    onAddSaved: vertexgroups => dispatch(addSaved(vertexgroups)),
    onSetDiagram: state_update => dispatch(setDiagram(state_update)),
  }),
)(SavedDiagrams);
