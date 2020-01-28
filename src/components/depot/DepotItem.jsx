// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrag, DragPreviewImage} from 'react-dnd';
import Chip from '@material-ui/core/Chip';
import {capitalizeFirstLetter} from '@utils/helpers';
import {modify} from '@utils/loaders';
import {useStyles} from '@style/styling';

export function DepotItem({itemProps, onClick}) {
  const classes = useStyles();

  const [{isDragging}, drag, preview] = useDrag({
    item: {type: 'DepotItem', id: itemProps.name},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{zIndex: 5}}>
      <DragPreviewImage src="img/icon-plus-20.png" connect={preview} />
      <Chip
        className={classes.chipDepot}
        title={itemProps.text}
        label={capitalizeFirstLetter(itemProps.name)}
        style={{opacity: isDragging ? 0.5 : 1}}
        onClick={() => onClick(itemProps.name)}
      />
    </div>
  );
}

export default connect(null, dispatch => ({
  onClick: name => dispatch(modify('context', {editor: name, editing: true})),
}))(DepotItem);
