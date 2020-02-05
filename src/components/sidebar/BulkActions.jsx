// @format
import React from 'react';
import {connect} from 'react-redux';
import {List, ListSubheader} from '@material-ui/core';
import {blankOperations} from '@data/reference';
import {modify} from '@data/reducers';
import {loadCore, loadOrg, pushOrg, pushImages} from '@ops/load';
import {saveDiagram} from '@ops/load';
import {buildDocker, runPipeline} from '@ops/build';
import {generateList} from '@utils/generateList';
import {genTextEdit} from '@utils/state';

function BulkActions({organization, operations, location, dispatch}) {
  const cancel = React.useRef(false);
  const onCancel = () => {
    if (operations.building !== null) cancel.current = true;
    else dispatch(modify('operations', blankOperations));
  };

  const saveDiag = fieldText => saveDiagram(location, fieldText.savename);
  const baseOptions = [
    ['save_diagram', () => dispatch(genTextEdit('saveDiagram', saveDiag))],
    ['refresh', () => dispatch(loadCore('diagrams', location))],
  ];
  const orgSet = fieldText => modify('config', {organization: fieldText});
  const orgCommit = fieldText => pushOrg(fieldText);
  const imagePusher = fieldText => pushImages(organization, fieldText.match);
  const testmode = operations.testing;
  const locationOptions = {
    configuration: [
      ['set_org', () => dispatch(genTextEdit('fetchOrg', orgSet))],
      ['load_org', () => dispatch(loadOrg(organization))],
      ['push_org', () => dispatch(genTextEdit('commit', orgCommit))],
    ],
    data: [],
    docker: [
      ['build_marked', () => dispatch(buildDocker(operations, cancel))],
      ['cancel_build', onCancel],
      ['push_images', () => dispatch(genTextEdit('pushImages', imagePusher))],
    ],
    pipeline: [
      ['test_mode', () => dispatch(modify('operations', {testing: !testmode}))],
      ['run_pipeline', () => dispatch(runPipeline())],
    ],
  };

  const actionOptions = baseOptions.concat(locationOptions[location]);
  return (
    <List>
      <ListSubheader inset>Actions</ListSubheader>
      {generateList('list', actionOptions)}
    </List>
  );
}

export default connect(state => ({
  operations: state.operations,
  organization: state.config.organization,
  location: state.context.location,
}))(BulkActions);
