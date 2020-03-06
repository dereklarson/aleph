// @format
import _ from 'lodash';

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
    if (deps.length === 0) library[uid].type = 'base';
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
