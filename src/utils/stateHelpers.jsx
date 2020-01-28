// @format
import _ from 'lodash';

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

export const librarySample = {
  sample: {
    name: 'sample',
    dependencies: [],
    text: '#Functional text will be here\n',
  },
};

export function genLibrary(names) {
  return names.reduce((library, name) => {
    library[name] = _.cloneDeep(librarySample.sample);
    library[name]['name'] = name;
    return library;
  }, {});
}

export function genGreatLibrary(locations, namedict = {def: ['sample']}) {
  return locations.reduce((library, location) => {
    let names = _.get(namedict, location, _.get(namedict, 'def', []));
    library[location] = genLibrary(names);
    return library;
  }, {});
}

export const requestSave = {
  texting: true,
  schema: {
    title: 'Enter Org Info',
    dispatch: false,
    keys: {
      savename: 1,
    },
  },
};

export const requestOrg = {
  texting: true,
  schema: {
    title: 'Enter Org Info',
    dispatch: true,
    keys: {
      name: 1,
      repository: 1,
    },
  },
};

export const godMode = {
  texting: true,
  schema: {
    title: 'Godmode',
    dispatch: true,
    godmode: 1,
  },
};
