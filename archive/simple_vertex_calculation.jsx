function calculateVertexPositions(vertices) {
  // Populate the generations of all vertices
  _.values(vertices).forEach(function(vertex) {
    // Only begin with roots
    if (_.size(vertex.parents) === 0) {
      // Recursive call, passing all vertices, starting key, and starting generation
      populateVertexGenerations(vertices, vertex.uid, 0);
    }
  });

  const width = 20; // Based on Fab size
  const height = 10; // Based on Fab size
  let row_shift = [0, 0, 0, 0, 0, 0, 0, 0];
  let arrows = [];

  // Now we'll calculate positions of the vertices based on generation
  // First loop to calculate position of the node and its in/out anchors
  _.values(vertices).forEach(function(vertex) {
    // Calculate an offset for our 3 "tracks" (rows) of nodes
    const x = row_shift[vertex.generation] * width;
    const y = vertex.generation * height;
    row_shift[vertex.generation] += 1;

    vertex['position'] = {x: x, y: y, height: height, width: width};
    vertex['in'] = {x: x + width / 2, y: y + height / 4};
    vertex['out'] = {x: x + width / 2, y: y + (3 * height) / 4};
  });

  // Then loop to populate the arrows array from the anchor positions and vertex children
  _.values(vertices).forEach(parent_vertex => {
    _.keys(parent_vertex.children).forEach(childId => {
      arrows.push({start: parent_vertex.out, end: vertices[childId].in});
    });
  });

  return arrows;
}

export function populateVertexGenerations(vertices, vId, curr_gen) {
  let existing_gen = _.get(vertices[vId], 'generation', 0);
  vertices[vId]['generation'] = Math.max(curr_gen, existing_gen);
  _.keys(vertices[vId].children).forEach(function(child) {
    populateVertexGenerations(vertices, child, curr_gen + 1);
  });
}
