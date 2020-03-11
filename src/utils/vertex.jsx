// @format
import _ from 'lodash';
import {objGen} from '@utils/helpers';

// Looks back through the vertex lineage to get all ancestors associated with it
export function getAncestry(vertices, libAssns, vertexId) {
  let currVertex = vertices[vertexId];
  let ancestors = [];
  let currAssns = _.clone(_.get(libAssns, vertexId, []));
  let aIdx = 0;
  while (_.size(currVertex.parents) !== 0) {
    ancestors = ancestors.concat(_.keys(currVertex.parents));
    currVertex = vertices[ancestors[aIdx]];
    currAssns = currAssns.concat(_.clone(_.get(libAssns, ancestors[aIdx], [])));
    aIdx++;
  }
  return [ancestors, currAssns];
}

export function sweepDirectedGraph(lineages, vertices, libAssns, relation) {
  let collection = relation === 'children' ? 'ancestors' : 'descendants';
  let associations = relation === 'children' ? 'ancAssns' : 'descAssns';
  let start = relation === 'children' ? 'parents' : 'children';

  // Run starting at all root nodes
  let queue = [];
  _.each(vertices, (vertex, uid) => {
    if (_.size(vertex[start]) === 0) queue.push(uid);
  });

  // Sweep from roots to leaves, adding children to stack
  while (queue.length !== 0) {
    console.log('Queue: ', queue);
    let currId = queue.pop();
    //Propagate information through to next relations
    _.each(vertices[currId][relation], (logic, childId) => {
      // Add vertex info
      lineages[childId][collection].add(currId);
      for (let itemId of lineages[currId][collection]) {
        lineages[childId][collection].add(itemId);
      }
      // Add association info
      for (let itemId of _.get(libAssns, currId, [])) {
        lineages[childId][associations].add(itemId);
      }
      for (let itemId of lineages[currId][associations]) {
        lineages[childId][associations].add(itemId);
      }
      queue.push(childId);
    });
  }
}

export function getAllLineages(vertices, libAssns) {
  let lineageDefault = {
    ancestors: new Set(),
    ancAssns: new Set(),
    descendants: new Set(),
    descAssns: new Set(),
  };
  let lineages = objGen(_.keys(vertices), lineageDefault);

  sweepDirectedGraph(lineages, vertices, libAssns, 'children');
  sweepDirectedGraph(lineages, vertices, libAssns, 'parents');
  return lineages;
}

// Useful for generating static initialization and test data, this will produce a set of
// vertices that are related via paths, e.g. ['a', 'b', 'c'] means 'c' is grandkid of 'a'
export function vertexDataFromPaths(paths) {
  let outputVertices = {};
  for (const path of paths.values()) {
    let parent = '';
    for (const vertex of path.values()) {
      // Simplest case, vertex is just a uid string
      let uid = vertex;
      if (typeof vertex === 'object') {
        uid = vertex['uid'];
      }
      if (_.has(outputVertices, uid)) {
        parent = uid;
        continue;
      }
      outputVertices[uid] = {
        uid: uid,
        children: {},
        parents: parent ? {[parent]: true} : {},
      };
      if (parent) outputVertices[parent].children[uid] = true;
      parent = uid;
    }
  }
  return outputVertices;
}
