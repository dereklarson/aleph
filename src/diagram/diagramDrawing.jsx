// @format
import dagre from 'dagre';

export function calculateDiagramPositions(vertices, dagre = false) {
  if (dagre === true) {
    console.log('Plotting graph using Dagre coords');
    try {
      return calculateDagre(vertices);
    } catch (exception) {
      console.log(exception);
    }
  }

  for (const [index, vertex] of vertices.entries()) {
    if (vertex.parents.length === 0) {
      populateVertexGenerations(vertices, index, 0);
    }
  }

  var width = 20; // Based on Fab size
  var height = 10; // Based on Fab size
  var row_shift = [0, 0, 0, 0, 0, 0, 0, 0];
  var arrows = [];

  // First loop to calculate position of the node and its in/out anchors
  vertices.forEach(function(entry) {
    // Calculate an offset for our 3 "tracks" (rows) of nodes
    var x = row_shift[entry.generation] * width;
    var y = entry.generation * height;
    row_shift[entry.generation] += 1;

    entry['position'] = {x: x, y: y, height: height, width: width};
    entry['in'] = {x: x + width / 2, y: y + height / 4};
    entry['out'] = {x: x + width / 2, y: y + (3 * height) / 4};
  });

  // Then loop to populate the arrows array from the anchor positions and vertex children
  vertices.forEach(parent => {
    parent.children.forEach(childIndex => {
      arrows.push({start: parent.out, end: vertices[childIndex].in});
    });
  });

  return arrows;
}

export function populateVertexGenerations(vertices, vIndex, current) {
  vertices[vIndex]['generation'] = current;
  for (var vChild of vertices[vIndex].children) {
    populateVertexGenerations(vertices, vChild, current + 1);
  }
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
  for (const [index, vertex] of vertices.entries()) {
    g.setNode(index, {width: 50, height: 30});
  }

  // Populate arrows
  var edges = [];
  for (const [parentIndex, parent] of vertices.entries()) {
    parent.children.forEach(childIndex => {
      edges.push({outIndex: parentIndex, inIndex: childIndex});
    });
  }
  edges.forEach(function(entry) {
    g.setEdge(entry.outIndex, entry.inIndex);
  });

  //Calculates all of the positions we need
  dagre.layout(g);

  // Get some scale factors to convert positions to percentages, with some buffer
  // transition helps us start in the upper left and center out as vertices are added
  const transition_scale = 0.5;
  var transition = Math.min(1, vertices.length / 10);
  var hScale = Math.min(10, 100 / g.graph().width);
  var vScale = Math.min(10, 100 / g.graph().height);
  var hZoom = 0.2 + (1 - transition) * transition_scale;
  var vZoom = 0.3 + (1 - transition) * transition_scale;
  var h0 = 0 + (1 - transition) * transition_scale;
  var v0 = 0.2 + (1 - transition) * transition_scale;

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

  var arrows = [];
  g.edges().forEach(function(edge) {
    var start = g.edge(edge).points[0];
    var end = g.edge(edge).points[2];
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
