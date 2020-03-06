// @format
import _ from 'lodash';
import {objGen} from '@utils/helpers';

export function genLibrary(names) {
  const librarySample = {
    sample: {
      uid: 'sample',
      dependencies: [],
      text: '#Functional text will be here\n',
    },
  };
  let deps = [];
  return names.reduce((library, uid) => {
    library[uid] = _.cloneDeep(librarySample.sample);
    library[uid]['uid'] = uid;
    library[uid].dependencies = _.clone(deps);
    deps.push(uid);
    return library;
  }, {});
}

// library: {
//   parent: [
//     ['tableId', 'int!'],
//     ['size', 'int'],
//     ['name', 'string'],
//   ],
// },
