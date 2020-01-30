// @format
import _ from 'lodash';

// Looks back through the vertex lineage to get all ancestors associated with it
export function getAncestry(vertices, vertexId) {
  let currVertex = vertices[vertexId];
  let ancestors = [];
  let sections = _.clone(currVertex.sections);
  let aIdx = 0;
  while (_.size(currVertex.parents) !== 0) {
    ancestors = ancestors.concat(_.keys(currVertex.parents));
    currVertex = vertices[ancestors[aIdx]];
    sections = sections.concat(_.clone(currVertex.sections));
    aIdx++;
  }
  return [ancestors, sections];
}

// Useful for generating static initialization and test data, this will produce a set of
// vertices that are related via paths, e.g. ['a', 'b', 'c'] means 'c' is grandkid of 'a'
export function vertexDataFromPaths(paths) {
  let outputVertices = {};
  for (const path of paths.values()) {
    let parent = '';
    for (const vertex of path.values()) {
      // Simplest case, vertex is just a uid string, and there are no sections
      let uid = vertex;
      let sections = [];
      if (typeof vertex === 'object') {
        uid = vertex['uid'];
        sections = vertex['sections'];
      }
      if (_.has(outputVertices, uid)) {
        parent = uid;
        continue;
      }
      outputVertices[uid] = {
        uid: uid,
        children: {},
        parents: parent ? {[parent]: true} : {},
        sections: sections,
      };
      if (parent) outputVertices[parent].children[uid] = true;
      parent = uid;
    }
  }
  return outputVertices;
}
