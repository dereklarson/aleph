// @format
import _ from 'lodash';

export function propsToStyle(styleProps) {
  return _.omitBy(
    {
      opacity: _.get(styleProps, 'isDragging') ? 0.5 : 1,
      border: _.get(styleProps, 'highlighted') ? '1px solid lightgreen' : null,
      backgroundColor: _.get(styleProps, 'building')
        ? 'green'
        : _.get(styleProps, 'prepared')
        ? 'lightgreen'
        : _.get(styleProps, 'testing')
        ? 'gray'
        : null,
    },
    _.isNil,
  );
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export function titlize(string) {
  let output = '';
  for (let word of string.split('_')) {
    output += capitalizeFirstLetter(word) + '\n';
  }
  return output.trim();
}

export function objGen(array) {
  return array.reduce((obj, item) => {
    obj[item] = {};
    return obj;
  }, {});
}

export function getLastLine(string) {
  return string
    .trim()
    .split('\n')
    .slice(-1)[0];
}
