// @format
import _ from 'lodash';
import {modify} from '@data/reducers';

export function genCoreData(categories, locations, globalData) {
  let output = {};
  for (const [category, def] of Object.entries(categories)) {
    let global = _.get(globalData, category, {});
    output[category] = locations.reduce((data, name) => {
      data[name] = _.cloneDeep(def);
      Object.assign(data[name], global);
      return data;
    }, {});
  }
  return output;
}

export const notEditingState = {
  editing: false,
  edittext: '',
  editfunc: null,
};

const textEditScenarios = {
  // Each row contains the title and array of keys
  saveDiagram: ['Save the current diagram', ['savename']],
  pushImages: ['Enter a match string', ['match']],
  fetchOrg: ['Enter Org info', ['name', 'uid', 'repository']],
};

export function genTextEdit(name, editfunc) {
  let keys = {};
  const [title, keynames] = textEditScenarios[name];
  keynames.forEach(key => {
    keys[key] = '';
  });
  return modify('context', {
    editing: true,
    editfunc: editfunc,
    schema: {title, keys, editor: false},
  });
}

const codeEditScenarios = {
  // Each row contains the title and a set of additional props
  commit: ['Enter commit information', {keys: {branch: ''}, mode: 'text'}],
  nodeEdit: ['Edit Node Code', {mode: 'python'}],
  libEdit: ['Edit Library Code', {mode: 'python'}],
  newDepot: [
    'Create New Item',
    {keys: {uid: '', bank: 'library', type: 'user'}, mode: 'text'},
  ],
  logs: ['Logs', {log: true, mode: 'text'}],
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
