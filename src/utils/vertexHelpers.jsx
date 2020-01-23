// @format
import _ from 'lodash';

// Looks back through the vertex lineage to get all ancestors associated with it
export function getAncestry(state, vertexId) {
  let currVertex = state[`${state.location}_vertices`][vertexId];
  let ancestors = [];
  let sections = _.clone(currVertex.sections);
  let aIdx = 0;
  while (currVertex.parents.length !== 0) {
    ancestors = ancestors.concat(_.clone(currVertex.parents));
    currVertex = state[`${state.location}_vertices`][ancestors[aIdx]];
    sections = sections.concat(_.clone(currVertex.sections));
    aIdx++;
  }
  return [ancestors, sections];
}

// Useful for generating static initialization and test data, this will produce a set of
// vertices that are related via paths, e.g. ['a', 'b', 'c'] means 'c' is grandkid of 'a'
export function vertexDataFromPaths(paths) {
  let outputVertices = [];
  let vMap = new Map();
  let currIndex = 0;
  let parent = '';
  for (const path of paths.values()) {
    for (const [index, name] of path.entries()) {
      if (vMap.has(name)) {
        parent = name;
        continue;
      }
      vMap.set(name, currIndex);
      const parentIndex = vMap.get(parent);
      let newVertex = {
        name: name,
        children: [],
        parents: [parentIndex],
        sections: [],
      };
      if (index === 0) newVertex.parents.pop();
      else outputVertices[parentIndex].children.push(currIndex);
      outputVertices.push(newVertex);
      currIndex = currIndex + 1;
      parent = name;
    }
  }
  return outputVertices;
}

// Updates the diagram vertices with a new path, taking into account overlap
// We will track vertices under consideration, which changes as we find matches
// For example, if a input vertex matches an existing one, we will only consider the children
// of the existing one going forward
export function vertexAdder(state, vertexgroups) {
  const loc_vertices = `${state.location}_vertices`;
  let updatedVertices = _.cloneDeep(state[loc_vertices]);
  let updatedFulltext = {...state[`${state.location}_fulltext`]};
  for (const inputVertices of vertexgroups.values()) {
    let considerUpdate = updatedVertices.keys();
    let parents = [];
    for (const vertex of inputVertices.values()) {
      let newv = true;
      let considering = considerUpdate;
      for (let index of considering) {
        if (_.isEqual(vertex.sections, updatedVertices[index].sections)) {
          considerUpdate = updatedVertices[index].children;
          parents = [index];
          newv = false;
          break;
        }
      }
      if (newv) {
        const newIndex = updatedVertices.length;
        if (parents.length > 0) {
          updatedVertices[parents[0]].children.push(newIndex);
        }
        updatedVertices.push({
          name: vertex.name,
          sections: _.cloneDeep(vertex.sections),
          parents: parents,
          children: [],
        });
        updatedFulltext[newIndex] = '';
        for (let section of vertex.sections) {
          updatedFulltext[newIndex] +=
            state[`${state.location}_library`][section].text;
        }
        parents = [newIndex];
      }
    }
  }
  return {
    [loc_vertices]: updatedVertices,
    [`${state.location}_fulltext`]: updatedFulltext,
  };
}

// Takes current list of vertices and generates the needed path segments to save
// These should be returned as [[{name: '', sections: ''}, ...], ...]
export function vertexSaver(vertices) {}
