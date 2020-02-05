// @format
import _ from 'lodash';

export function propsToStyle(styleProps) {
  return {
    opacity: _.get(styleProps, 'isDragging') ? 0.5 : 1,
    backgroundColor: _.get(styleProps, 'highlighted')
      ? '#C9C9FF'
      : _.get(styleProps, 'building')
      ? 'green'
      : _.get(styleProps, 'prepared')
      ? 'lightgreen'
      : _.get(styleProps, 'testing')
      ? 'gray'
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
  let output = '';
  for (let word of string.split('_')) {
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

export function createText({library, sections, corpus, uid}) {
  if (_.has(corpus, uid)) return corpus[uid].text;
  else {
    let text = '';
    sections.forEach(sectionUid => {
      text += library[sectionUid].text;
    });
    return text;
  }
}

export function generateCorpus({vertices, library, corpus}) {
  let output = {};
  _.values(vertices).forEach(vertex => {
    let uid = vertex.uid;
    output[uid] = {
      text: createText({library, sections: vertex.sections, corpus, uid}),
    };
  });
  return output;
}
