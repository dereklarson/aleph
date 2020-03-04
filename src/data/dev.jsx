// @format
import _ from 'lodash';
import {objGen} from '@utils/helpers';

export const devStyles = {
  blue_square: {
    uid: 'blue_square',
    type: 'shape',
    text: '{"backgroundColor": "blue", "height": "80px", "width": "80px"}',
  },
  red_circle: {
    uid: 'red_circle',
    type: 'shape',
    text: `{"backgroundColor": "red",
          "borderRadius": "50%",
          "height": "80px",
          "width": "80px"
        }`,
  },
  green_triangle: {
    uid: 'green_triangle',
    type: 'shape',
    text: `{"backgroundColor": "transparent",
        "width": "80px",
        "height": "0px",
        "padding": "0",
        "borderRadius": "0",
        "borderLeft": "25px solid transparent",
        "borderRight": "25px solid transparent",
        "borderBottom": "80px solid green"
        }`,
  },
};

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

export function genBattery(locations, namedict = {def: ['parent', 'child']}) {
  return locations.reduce((battery, location) => {
    let names = _.get(namedict, location, _.get(namedict, 'def', []));
    battery[location].datasets = {};
    battery[location].library = genLibrary(names);
    battery[location].styles = devStyles;
    return battery;
  }, objGen(locations));
}

export const devBattery = {};

// library: {
//   parent: [
//     ['tableId', 'int!'],
//     ['size', 'int'],
//     ['name', 'string'],
//   ],
// },
