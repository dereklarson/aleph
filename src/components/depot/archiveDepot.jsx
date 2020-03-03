// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrop} from 'react-dnd';
import {Button, Chip, Paper, Tooltip, Typography} from '@material-ui/core';
import _ from 'lodash';
import DepotItem from './DepotItem';
import {titlize} from '@utils/helpers';
import {useStyles} from '@style/classes';
import {genCodeEdit} from '@utils/state';
import {addToLibrary} from '@data/reducers';
import {saveLibrary} from '@ops/load';
import {removeVertex, removeAllAssociations, clearText} from '@data/reducers';

const tooltips = {
  base: "Base items are starting points, OS's and public images",
  standard: 'Standard nodes can be added anywhere after base nodes',
};

export function PureDepot({location, onVertexDrop, onNew, library}) {
  const classes = useStyles();
  const libraryInput = _.sortBy(Object.values(library), 'type');
  const [open, setOpen] = React.useState(true);
  const [openType, setOpenType] = React.useState('standard');
  const dividers = {};

  const [{highlighted}, drop] = useDrop({
    accept: 'Vertex',
    drop: item => onVertexDrop({location, uid: item.uid}),
    collect: monitor => ({
      highlighted: monitor.canDrop(),
    }),
  });

  // Special entry for creating a new library item
  // This has two dispatches, so we puth them behind a thunk
  const editfunc = ({fieldText, aceText}) => dispatch => {
    dispatch(addToLibrary({location, ...fieldText, text: aceText}));
    dispatch(saveLibrary(location, fieldText.uid));
  };
  const itemDisplay = [
    <Typography key="title" variant="h6" onClick={() => setOpen(!open)}>
      Library
    </Typography>,
  ];

  if (open) {
    itemDisplay.push(
      <Chip
        key="new"
        label="(New)"
        onClick={() => onNew({editfunc, edittext: ''})}
      />,
    );
    libraryInput.forEach(function(item, index) {
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
          <DepotItem key={index} atype="library" itemProps={item} />,
        );
    });
  }

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

export default connect(
  state => ({
    location: state.context.location,
    library: state.library[state.context.location],
  }),
  dispatch => ({
    onVertexDrop: payload => {
      dispatch(removeVertex(payload));
      dispatch(removeAllAssociations(payload));
      dispatch(clearText(payload));
    },
    onNew: payload => dispatch(genCodeEdit('newLib', payload)),
  }),
)(PureDepot);
