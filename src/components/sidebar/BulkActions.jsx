// @format
import React from 'react';
import {connect} from 'react-redux';
import {List, ListSubheader} from '@material-ui/core';
import {blankOperations} from '@data/reference';
import {modify} from '@data/reducers';
import {loadCore, loadOrg} from '@ops/load';
import {buildDocker} from '@ops/build';
import {pushOrg, pushImages} from '@ops/control';
import {generateList} from '@utils/generateList';
import {imagePush, requestSave, requestOrg} from '@utils/state';

function BulkActions({organization, operations, location, dispatch}) {
  const cancel = React.useRef(false);
  const onCancel = () => {
    if (operations.building !== null) cancel.current = true;
    else dispatch(modify('operations', blankOperations));
  };
  const baseOptions = [
    ['save_diagram', () => dispatch(modify('context', {...requestSave}))],
    ['refresh', () => dispatch(loadCore('diagrams', location))],
  ];
  const orgSet = fieldText => modify('config', {organization: fieldText});
  const imagePusher = fieldText => pushImages(organization, fieldText.match);
  const locationOptions = {
    configuration: [
      [
        'set_org',
        () => dispatch(modify('context', {...requestOrg, editfunc: orgSet})),
      ],
      ['load_org', () => dispatch(loadOrg(organization))],
      ['push_org', () => dispatch(pushOrg())],
    ],
    data: [],
    docker: [
      ['build_marked', () => dispatch(buildDocker(operations, cancel))],
      ['cancel_build', onCancel],
      [
        'push_images',
        () =>
          dispatch(modify('context', {...imagePush, editfunc: imagePusher})),
      ],
    ],
    pipeline: [],
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
