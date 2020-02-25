// @format
import dagre from 'dagre';
import _ from 'lodash';
import {locationStyles, rescale} from '@style/styleDiagram';

export function calculateDiagramPositions(vertices, location) {
  const style = _.get(locationStyles, location, locationStyles.default);
  // Basic Dagre Initialization
  var g = new dagre.graphlib.Graph();
  g.setGraph({rankdir: style.rankdir});
  g.setDefaultEdgeLabel(function() {
    return {};
  });

  // Populate nodes with two args: ID and metadata
  _.values(vertices).forEach(vertex => {
    // TODO Alter this to do something special for Cards?
    if (vertex !== null) {
      g.setNode(vertex.uid, {width: style.width, height: style.height});
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
  const dr = style.dagreRescaling;
  const transition = Math.min(1, _.size(vertices) / dr.vertexCountFull);
  const scaleFactor = (1 - transition) * dr.startingScale;
  const hScale = Math.min(1, 100 / g.graph().width);
  const vScale = Math.min(1, 100 / g.graph().height);
  const hZoom = dr.hZoomBase + scaleFactor;
  const vZoom = dr.vZoomBase + scaleFactor;
  const h0 = dr.hOffsetBase + scaleFactor;
  const v0 = dr.vOffsetBase + scaleFactor;

  // console.log('Graph: ' + hScale + ', ' + vScale);

  g.nodes().forEach(v => {
    vertices[v]['position'] = {
      x: rescale(g.node(v).x, g.node(v).width, hScale, hZoom, h0),
      y: rescale(g.node(v).y, g.node(v).height, vScale, vZoom, v0),
      width: Math.floor(g.node(v).width * hScale),
      height: Math.floor(g.node(v).height * vScale),
    };
    // console.log('Node ' + v + ': ' + JSON.stringify(vertices[v]['position']));
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
    // console.log(
    //   'Edge ' + edge.v + ' -> ' + edge.w + ': ' + JSON.stringify(g.edge(edge)),
    // );
  });

  return arrows;
}
