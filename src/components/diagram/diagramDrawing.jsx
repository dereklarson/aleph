// @format
import dagre from 'dagre';
import _ from 'lodash';

export function calculateDiagramPositions(vertices, dagre = false) {
  if (dagre === true) {
    console.log('Plotting graph using Dagre coords');
    try {
      return calculateDagre(vertices);
    } catch (exception) {
      console.log(exception);
    }
  }

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
  vertices[vId]['generation'] = curr_gen;
  _.keys(vertices[vId].children).forEach(function(child) {
    populateVertexGenerations(vertices, child, curr_gen + 1);
  });
}

function rescale(x, w, frac, draw, edge) {
  return Math.floor(50 * (draw - edge) + frac * ((1 - draw) * x - w / 2));
}

function calculateDagre(vertices) {
  // Basic Dagre Initialization
  var g = new dagre.graphlib.Graph();
  g.setGraph({});
  g.setDefaultEdgeLabel(function() {
    return {};
  });

  // Populate nodes with two args: ID and metadata
  _.values(vertices).forEach(vertex => {
    // TODO Alter this to do something special for Cards?
    if (vertex !== null) {
      g.setNode(vertex.uid, {width: 8, height: 20});
    }
  });

  // Populate arrows
  let edges = [];
  _.values(vertices).forEach(parent_vertex => {
    _.keys(parent_vertex.children).forEach(childId => {
      edges.push({outId: parent_vertex.uid, inId: childId});
    });
  });

  edges.forEach(function(entry) {
    g.setEdge(entry.outId, entry.inId);
  });

  //Calculates all of the positions we need
  dagre.layout(g);

  // Get some scale factors to convert positions to percentages, with some buffer
  // transition helps us start in the upper left and center out as vertices are added
  const transition_scale = 0.7;
  const transition = Math.min(1, _.size(vertices) / 10);
  const hScale = Math.min(1, 100 / g.graph().width);
  const vScale = Math.min(1, 100 / g.graph().height);
  const hZoom = 0.2 + (1 - transition) * transition_scale;
  const vZoom = 0.3 + (1 - transition) * transition_scale;
  const h0 = 0 + (1 - transition) * transition_scale;
  const v0 = 0.2 + (1 - transition) * transition_scale;

  console.log('Graph: ' + hScale + ', ' + vScale);

  g.nodes().forEach(v => {
    vertices[v]['position'] = {
      x: rescale(g.node(v).x, g.node(v).width, hScale, hZoom, h0),
      y: rescale(g.node(v).y, g.node(v).height, vScale, vZoom, v0),
      width: Math.floor(g.node(v).width * hScale),
      height: Math.floor(g.node(v).height * vScale),
    };
    console.log('Node ' + v + ': ' + JSON.stringify(vertices[v]['position']));
  });

  let arrows = [];
  g.edges().forEach(function(edge) {
    const start = g.edge(edge).points[0];
    const end = g.edge(edge).points[2];
    arrows.push({
      start: {
        x: rescale(start.x, 0, hScale, hZoom, h0),
        y: rescale(start.y, 0, vScale, vZoom, v0),
      },
      end: {
        x: rescale(end.x, 0, hScale, hZoom, h0),
        y: rescale(end.y, 0, vScale, vZoom, v0),
      },
    });
    console.log(
      'Edge ' + edge.v + ' -> ' + edge.w + ': ' + JSON.stringify(g.edge(edge)),
    );
  });

  return arrows;
}
