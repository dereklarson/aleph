// @format
import React from 'react';
import {connect} from 'react-redux';
import {Button, Paper, Tooltip, Typography} from '@material-ui/core';
import _ from 'lodash';
import DepotItem from './DepotItem';
import {titlize} from '@utils/helpers';
import {useStyles} from '@style/classes';

const tooltips = {};

export function PureDataDepot({location, datasets}) {
  const classes = useStyles();
  const dataInput = _.sortBy(Object.values(datasets), 'type');
  const [open, setOpen] = React.useState({csv: true});
  const dividers = {};

  const itemDisplay = [
    <Typography key="title" variant="h6" component="h2">
      Data
    </Typography>,
  ];
  dataInput.forEach(function(item, index) {
    const itemtype = _.get(item, 'type', 'unknown');
    let typeOpen = false;
    if (!_.has(dividers, itemtype)) {
      dividers[itemtype] = itemtype;
      typeOpen = _.get(open, itemtype, false);
      let onClick = () => setOpen({...open, [itemtype]: !typeOpen});
      let suffix = typeOpen ? '' : '...';
      itemDisplay.push(
        <Tooltip
          key={itemtype}
          title={_.get(tooltips, itemtype, '(No description)')}
          placement="bottom"
          enterDelay={500}>
          <Button size="small" onClick={onClick}>
            {titlize(itemtype + suffix)}
          </Button>
        </Tooltip>,
      );
    }
    if (typeOpen) itemDisplay.push(<DepotItem key={index} itemProps={item} />);
  });

  return (
    <div>
      <Tooltip
        title="These are pre-created items with which you can compose your diagram"
        placement="bottom"
        enterDelay={500}>
        <Paper className={classes.paper}>{itemDisplay}</Paper>
      </Tooltip>
    </div>
  );
}

export default connect(state => ({
  location: state.context.location,
  datasets: state.datasets,
}))(PureDataDepot);
