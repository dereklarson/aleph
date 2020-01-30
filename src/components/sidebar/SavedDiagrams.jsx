// @format
import React from 'react';
import {connect} from 'react-redux';
import {List, ListSubheader} from '@material-ui/core';
// import _ from 'lodash';
import {generateList} from '@utils/generateList';
import {addDiagram} from '@data/reducers';

function SavedDiagrams({location, diagrams, onAddDiagram}) {
  let items = [];
  for (const [name, content] of Object.entries(diagrams)) {
    let onClick = () => onAddDiagram({location, content});
    items.push([name, onClick]);
  }

  return (
    <List>
      <ListSubheader inset>Saved Diagrams</ListSubheader>
      {generateList(items, 'Load the diagram called <>', 'assignment')}
    </List>
  );
}

export default connect(
  state => ({
    location: state.context.location,
    diagrams: state.diagrams[state.context.location],
  }),
  dispatch => ({
    onAddDiagram: payload => dispatch(addDiagram(payload)),
  }),
)(SavedDiagrams);
