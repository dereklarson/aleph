// @format
import _ from 'lodash';

export function genLocationData(loc, defaults = {}) {
  return loc.reduce((data, name) => {
    data[`${name}_vertices`] = _.get(defaults, 'vertices', []);
    data[`${name}_library`] = _.get(defaults, 'library', {});
    data[`${name}_fulltext`] = _.get(defaults, 'fulltext', new Map());
    data[`${name}_diagrams`] = _.get(defaults, 'saved', {});
    return data;
  }, {});
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
  return locations.reduce((great_library, location) => {
    let names = _.get(namedict, location, _.get(namedict, 'def', []));
    great_library[`${location}_library`] = genLibrary(names);
    return great_library;
  }, {});
}

export const requestSave = {
  texting: true,
  entry_schema: {
    title: 'Enter Org Info',
    dispatch: false,
    keys: {
      savename: 1,
    },
  },
};

export const requestOrg = {
  texting: true,
  entry_schema: {
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
  entry_schema: {
    title: 'Enter Org Info',
    dispatch: true,
    godmode: 1,
  },
};
