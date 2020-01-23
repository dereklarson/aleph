// @format
import _ from 'lodash';

export function genLocationData(loc, defaults = {}) {
  return loc.reduce((data, name) => {
    data[`${name}_vertices`] = _.get(defaults, 'vertices', []);
    data[`${name}_library`] = _.get(defaults, 'library', {});
    data[`${name}_fulltext`] = _.get(defaults, 'fulltext', new Map());
    data[`${name}_saved`] = _.get(defaults, 'saved', {});
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
