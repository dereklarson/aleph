// @format
import React from 'react';
import {connect} from 'react-redux';
import {Button, Paper, Tooltip, Typography} from '@material-ui/core';
import _ from 'lodash';
import DepotItem from './DepotItem';
import {titlize} from '@utils/helpers';
import {useStyles} from '@style/classes';

const tooltips = {
  base: "Base items are starting points, OS's and public images",
  standard: 'Standard nodes can be added anywhere after base nodes',
};

export function PureBank({uid, location, inputs}) {
  const classes = useStyles();
  const bankInput = _.sortBy(Object.values(inputs), 'type');
  const [open, setOpen] = React.useState(true);
  const [openType, setOpenType] = React.useState('standard');
  const dividers = {};

  const itemDisplay = [
    <Typography key="title" variant="h6" onClick={() => setOpen(!open)}>
      {titlize(uid)}
    </Typography>,
  ];

  if (open) {
    bankInput.forEach((item, index) => {
      const itemType = _.get(item, 'type', 'standard');
      const isOpen = openType === itemType;
      if (!_.has(dividers, itemType)) {
        dividers[itemType] = itemType;
        let onClick = () => setOpenType(isOpen ? '' : itemType);
        let suffix = isOpen ? '' : '...';
        itemDisplay.push(
          <Tooltip
            key={itemType}
            title={_.get(tooltips, itemType, '(No description)')}
            placement="bottom"
            enterDelay={500}>
            <Button size="small" onClick={onClick}>
              {titlize(itemType + suffix)}
            </Button>
          </Tooltip>,
        );
      }
      if (isOpen)
        itemDisplay.push(
          <DepotItem key={index} atype={uid} itemProps={item} />,
        );
    });
  }

  return (
    <div>
      <Tooltip
        title="These are pre-created items with which you can compose your diagram"
        placement="bottom"
        enterDelay={500}>
        <Paper className={classes.paperList}>{itemDisplay}</Paper>
      </Tooltip>
    </div>
  );
}

export default connect((state, ownProps) => ({
  location: state.context.location,
  inputs: state.battery[state.context.location][ownProps.uid],
}))(PureBank);
