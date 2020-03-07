// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrop} from 'react-dnd';
import {Chip, Paper, Typography} from '@material-ui/core';
// import _ from 'lodash';
import Bank from './Bank';
import {bankTypes} from '@data/reference';
import {objGen} from '@utils/helpers';
import {useStyles} from '@style/classes';
import {genCodeEdit} from '@utils/state';
import {addToBattery} from '@data/reducers';
import {removeFullVertex} from '@data/combined';
import {saveBattery} from '@ops/load';
import {generateList} from '@utils/generateList';

export function PureDepot({location, onVertexDrop, onNew}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(objGen(bankTypes, true));
  const onOpen = item => () => setOpen({...open, [item]: !open[item]});

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

  const actionOptions = [];
  const bankDisplay = [];
  bankTypes.forEach(item => {
    actionOptions.push([item, onOpen(item)]);
    if (open[item]) bankDisplay.push(<Bank key={item} uid={item} />);
  });

  return (
    <div ref={drop}>
      <Paper
        className={classes.paperList}
        style={{border: highlighted ? '1px solid green' : null}}>
        <div key="title" className={classes.table}>
          <Typography variant="h6"> Depot </Typography>
          {generateList('button', actionOptions)}
        </div>
        <Chip
          label="(New Item)"
          onClick={() => onNew({editfunc, edittext: ''})}
        />
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
