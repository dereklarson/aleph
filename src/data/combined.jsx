// @format
import _ from 'lodash';
import {addVertex, linkVertex, addAssociation} from '@data/reducers';

function generateSequentialId(uid, existing) {
  while (_.has(existing, uid)) {
    let result = /_(\d{1,})/.exec(uid);
    let iter = 0;
    if (result == null) uid = uid + '_2';
    else {
      let new_ct = parseInt(result[1]) + 1;
      uid = uid.replace(result[1], new_ct);
      iter = iter + 1;
      if (iter > 10) return uid + 'x';
    }
  }
  return uid;
}

export function addNewVertex({location, uid, association, isParent, linkId}) {
  return function(dispatch, getState) {
    console.log('addNewVertex:', location, uid, isParent, linkId);
    let vertices = getState().vertices[location];
    uid = generateSequentialId(uid, vertices);
    let [parent, child] = isParent ? [uid, linkId] : [linkId, uid];
    console.log(parent, '->', child);
    dispatch(addVertex({location, uid}));
    dispatch(addAssociation({location, uid, association}));
    if (parent != null) dispatch(linkVertex({location, parent, child}));
  };
}
