// @format
import _ from 'lodash';
import {modify} from '@data/reducers';

export function genCoreData(categories, locations) {
  let output = {};
  for (const [category, def] of Object.entries(categories)) {
    output[category] = locations.reduce((data, name) => {
      data[name] = _.cloneDeep(def);
      return data;
    }, {});
  }
  return output;
}

export function genLibrary(names) {
  const librarySample = {
    sample: {
      uid: 'sample',
      dependencies: [],
      text: '#Functional text will be here\n',
    },
  };
  return names.reduce((library, uid) => {
    library[uid] = _.cloneDeep(librarySample.sample);
    library[uid]['uid'] = uid;
    return library;
  }, {});
}

export function genGreatLibrary(
  locations,
  namedict = {def: ['parent', 'child']},
) {
  return locations.reduce((library, location) => {
    let names = _.get(namedict, location, _.get(namedict, 'def', []));
    library[location] = genLibrary(names);
    return library;
  }, {});
}

export const notEditingState = {
  editing: false,
  edittext: '',
  editfunc: null,
  schema: {editor: false, title: 'TextEntry'},
};

const textEditScenarios = {
  // Each row contains the title and array of keys
  saveDiagram: ['Save the current diagram', ['savename']],
  commit: ['Enter commit information', ['branch', 'commit_msg']],
  pushImages: ['Enter a match string', ['match']],
  fetchOrg: ['Enter Org info', ['name', 'uid', 'repository']],
};

export function genTextEdit(name, editfunc) {
  let keys = {};
  const [title, keynames] = textEditScenarios[name];
  keynames.forEach(key => {
    keys[key] = true;
  });
  return modify('context', {
    editing: true,
    editfunc: editfunc,
    schema: {title, keys, editor: false},
  });
}

const codeEditScenarios = {
  // Each row contains the title and a set of additional props
  nodeEdit: ['Edit Node Code', {mode: 'python'}],
  libEdit: ['Edit Library Code', {mode: 'python'}],
  newLib: ['Create New Item', {keys: {uid: true}, mode: 'python'}],
  logs: ['Logs', {mode: 'text'}],
};

export function genCodeEdit(name, {editfunc, edittext}) {
  const [title, props] = codeEditScenarios[name];
  return modify('context', {
    editing: true,
    editfunc: editfunc,
    edittext: edittext,
    schema: {...props, title, editor: true},
  });
}
