// @format
import _ from 'lodash';

// Useful for generating static initialization and test data, this will produce a set of
// vertices that are related via paths, e.g. ['a', 'b', 'c'] means 'c' is grandkid of 'a'
export function vertexDataFromPaths(paths) {
  var outputVertices = [];
  var vMap = new Map();
  var currIndex = 0;
  var parent = '';
  for (const path of paths.values()) {
    for (const [index, name] of path.entries()) {
      if (vMap.has(name)) {
        parent = name;
        continue;
      }
      vMap.set(name, currIndex);
      var parentIndex = vMap.get(parent);
      var newVertex = {
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
  var updatedVertices = _.cloneDeep(state[loc_vertices]);
  var updatedFulltext = {...state[`${state.location}_fulltext`]};
  for (const inputVertices of vertexgroups.values()) {
    var considerUpdate = updatedVertices.keys();
    var parents = [];
    for (const vertex of inputVertices.values()) {
      var newv = true;
      var considering = considerUpdate;
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
