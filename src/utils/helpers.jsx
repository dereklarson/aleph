// @format
import _ from 'lodash';

export function propsToStyle(styleProps) {
  return {
    opacity: _.get(styleProps, 'isDragging')
      ? 0.5
      : _.get(styleProps, 'ghost')
      ? 0.2
      : 1,
    backgroundColor: _.get(styleProps, 'highlighted')
      ? '#C9C9FF'
      : _.get(styleProps, 'building')
      ? 'green'
      : _.get(styleProps, 'prepared')
      ? 'lightgreen'
      : null,
  };
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export function titlize(string) {
  var output = '';
  for (var word of string.split('_')) {
    output += capitalizeFirstLetter(word) + '\n';
  }
  return output.trim();
}

export function getLastLine(string) {
  return string
    .trim()
    .split('\n')
    .slice(-1)[0];
}
