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

  const width = 20; // Based on Fab size
  const height = 10; // Based on Fab size
  let row_shift = [0, 0, 0, 0, 0, 0, 0, 0];
  let arrows = [];

  // First loop to calculate position of the node and its in/out anchors
  vertices.forEach(function(entry) {
    // Calculate an offset for our 3 "tracks" (rows) of nodes
    const x = row_shift[entry.generation] * width;
    const y = entry.generation * height;
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
  for (let vChild of vertices[vIndex].children) {
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
    // TODO Alter this to do something special for Cards?
    if (vertex !== null) {
      g.setNode(index, {width: 50, height: 30});
    }
  }

  // Populate arrows
  let edges = [];
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
  const transition = Math.min(1, vertices.length / 10);
  const hScale = Math.min(10, 100 / g.graph().width);
  const vScale = Math.min(10, 100 / g.graph().height);
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
        y: rescale(start.y, 0, vScale, vZoom, v0) - 2, //Quick fudge for now
      },
      end: {
        x: rescale(end.x, 0, hScale, hZoom, h0),
        y: rescale(end.y, 0, vScale, vZoom, v0) - 2,
      },
    });
    console.log(
      'Edge ' + edge.v + ' -> ' + edge.w + ': ' + JSON.stringify(g.edge(edge)),
    );
  });

  return arrows;
}
