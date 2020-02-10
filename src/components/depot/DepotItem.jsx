// @format
import React from 'react';
import {connect} from 'react-redux';
import {useDrag, DragPreviewImage} from 'react-dnd';
import Chip from '@material-ui/core/Chip';
import {titlize} from '@utils/helpers';
import {writeText} from '@data/reducers';
import {genCodeEdit} from '@utils/state';
import {useStyles} from '@style/styling';

export function DepotItem({itemProps, location, onClick}) {
  const classes = useStyles();

  const [{isDragging}, drag, preview] = useDrag({
    item: {type: 'DepotItem', uid: itemProps.uid},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const editfunc = text =>
    writeText({location, uid: itemProps.uid, text: text['_editor']});
  return (
    <div ref={drag} style={{zIndex: 5}}>
      <DragPreviewImage src="img/icon-plus-20.png" connect={preview} />
      <Chip
        className={classes.chipDepot}
        title={itemProps.text}
        label={titlize(itemProps.uid)}
        style={{opacity: isDragging ? 0.5 : 1}}
        onClick={() => onClick({editfunc, edittext: itemProps.text})}
      />
    </div>
  );
}

export default connect(
  state => ({location: state.context.location}),
  dispatch => ({
    onClick: payload => dispatch(genCodeEdit('libEdit', payload)),
  }),
)(DepotItem);
