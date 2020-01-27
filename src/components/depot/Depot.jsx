// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrop} from 'react-dnd';
import {Paper, Typography, Tooltip} from '@material-ui/core';
import _ from 'lodash';
import DepotItem from './DepotItem';
import {capitalizeFirstLetter} from '@utils/helpers';
import {useStyles} from '@style/styling';

const tooltips = {
  base: "Base items are starting points, OS's and public images",
  standard: 'Standard nodes can be added anywhere after base nodes',
};

export function PureDepot({onVertexDrop, library}) {
  const classes = useStyles();
  const libraryInput = _.sortBy(Object.values(library), 'type');
  const itemDisplay = [];
  const dividers = {};
  for (const item of libraryInput) {
    const itemtype = _.get(item, 'type', 'standard');
    if (!_.has(dividers, itemtype)) {
      dividers[itemtype] = itemtype;
      itemDisplay.push(
        <Tooltip
          title={_.get(tooltips, itemtype, '(No description)')}
          placement="bottom"
          enterDelay={500}>
          <Typography variant="h6" component="h2">
            {capitalizeFirstLetter(itemtype)}
          </Typography>
        </Tooltip>,
      );
    }
    itemDisplay.push(<DepotItem itemProps={item} />);
  }

  const [{highlighted}, drop] = useDrop({
    accept: 'Vertex',
    drop: item => onVertexDrop(item.id),
    collect: monitor => ({
      highlighted: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop}>
      <Tooltip
        title="These are pre-created items with which you can compose your diagram"
        placement="bottom"
        enterDelay={500}>
        <Paper
          className={classes.paper}
          style={{backgroundColor: highlighted ? '#FFA07A' : null}}>
          {itemDisplay}
        </Paper>
      </Tooltip>
    </div>
  );
}

export const removeVertex = from => ({
  type: 'REMOVE_VERTEX',
  vertex: from,
});

export default connect(
  state => ({library: state[`${state.location}_library`]}),
  dispatch => ({onVertexDrop: vertexId => dispatch(removeVertex(vertexId))}),
)(PureDepot);
