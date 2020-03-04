// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrop} from 'react-dnd';
import {Chip, Paper, Typography} from '@material-ui/core';
// import _ from 'lodash';
import Bank from './Bank';
import {useStyles} from '@style/classes';
import {genCodeEdit} from '@utils/state';
import {bankTypes} from '@data/reference';
import {addToBattery} from '@data/reducers';
import {removeFullVertex} from '@data/combined';
import {saveBattery} from '@ops/load';

export function PureDepot({location, onVertexDrop, onNew}) {
  const classes = useStyles();

  const [{highlighted}, drop] = useDrop({
    accept: 'Vertex',
    drop: item => onVertexDrop({location, uid: item.uid}),
    collect: monitor => ({
      highlighted: monitor.canDrop(),
    }),
  });

  // Special entry for creating a new DepotItem
  // This has two dispatches, so we puth them behind a thunk
  const editfunc = ({fieldText, aceText}) => dispatch => {
    dispatch(addToBattery({location, ...fieldText, text: aceText}));
    dispatch(saveBattery({location, ...fieldText}));
  };

  const bankDisplay = [];
  bankTypes.forEach(item => {
    bankDisplay.push(<Bank key={item} uid={item} />);
  });

  return (
    <div ref={drop}>
      <Paper
        className={classes.paperList}
        style={{backgroundColor: highlighted ? '#FFA07A' : null}}>
        <Typography key="title" variant="h6">
          Depot
        </Typography>
        <Chip label="(New)" onClick={() => onNew({editfunc, edittext: ''})} />
        {bankDisplay}
      </Paper>
    </div>
  );
}

export default connect(
  state => ({location: state.context.location}),
  dispatch => ({
    onVertexDrop: payload => dispatch(removeFullVertex(payload)),
    onNew: payload => dispatch(genCodeEdit('newDepot', payload)),
  }),
)(PureDepot);
