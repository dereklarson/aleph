// @format
import React from 'react';
import {useDrag, DragPreviewImage} from 'react-dnd';
import Chip from '@material-ui/core/Chip';
import _ from 'lodash';
import {capitalizeFirstLetter} from '../utils/helpers';

export default function DepotItem({itemProps}) {
  const [{isDragging}, drag, preview] = useDrag({
    item: {type: 'DepotItem', id: itemProps.name},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag}>
      <DragPreviewImage src="img/icon-plus-20.png" connect={preview} />
      <Chip
        title={itemProps.text}
        label={capitalizeFirstLetter(itemProps.name)}
        style={{opacity: isDragging ? 0.5 : 1}}
      />
    </div>
  );
}
