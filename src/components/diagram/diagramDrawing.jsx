// @format
import dagre from 'dagre';
import _ from 'lodash';
import {locationStyles, rescale, rescale_2} from '@style/diagram';

export function calculateDiagramPositions(vertices, location) {
  const style = _.get(locationStyles, location, locationStyles.default);
  // Basic Dagre Initialization
  var g = new dagre.graphlib.Graph();
  g.setGraph({rankdir: style.rankdir});
  g.setDefaultEdgeLabel(() => ({}));

  // Populate nodes with two args: ID and metadata
  _.values(vertices).forEach(vertex => {
    // TODO Alter this to do something special for Cards?
    if (vertex !== null) {
      g.setNode(vertex.uid, {width: 1, height: 1});
      // g.setNode(vertex.uid, {width: style.width, height: style.height});
    }
  });

  // Populate arrows
  let edges = [];
  _.values(vertices).forEach(parent_vertex => {
    _.keys(parent_vertex.children).forEach(childId => {
      edges.push({outId: parent_vertex.uid, inId: childId});
    });
  });

  edges.forEach(entry => g.setEdge(entry.outId, entry.inId));

  //Calculates all of the positions we need
  dagre.layout(g);

  // Get some scale factors to convert positions to percentages, with some buffer
  // transition helps us start in the upper left and center out as vertices are added
  const dr = style.dagreRescaling;
  const transition = Math.min(1, _.size(vertices) / dr.vertexCountFull);
  const padding = 5 * (1 - transition);
  const hScale = Math.min(1, (dr.h0 * transition * 100) / g.graph().width);
  const vScale = Math.min(1, (dr.v0 * transition * 100) / g.graph().height);

  // console.log('Graph Raw: ' + g.graph().width + ', ' + g.graph().height);
  // console.log('Graph: ' + hScale + ', ' + vScale);

  g.nodes().forEach(v => {
    // Calculate upper left position
    let ul_x = Math.floor(g.node(v).x - g.node(v).width / 2);
    let ul_y = Math.floor(g.node(v).y - g.node(v).height / 2);
    vertices[v]['position'] = {
      x: rescale_2(ul_x, hScale, padding),
      y: rescale_2(ul_y, vScale, padding),
      width: style.width,
      height: style.height,
    };
    // let nv = g.node(v);
    // console.log('Node ' + v + ' Raw: ' + nv.x + ', ' + nv.y);
    // console.log('Node ' + v + ': ' + JSON.stringify(vertices[v]['position']));
  });

  let arrows = [];
  g.edges().forEach(function(edge) {
    const start = g.edge(edge).points[0];
    const end = g.edge(edge).points[2];
    arrows.push({
      start: {
        x: rescale_2(start.x, hScale, padding) + style.width / 2,
        y: rescale_2(start.y, vScale, padding) + 0.8 * style.height,
      },
      end: {
        x: rescale_2(end.x, hScale, padding) + style.width / 2,
        y: rescale_2(end.y, vScale, padding) - 0.1 * style.height,
      },
    });
  });
  return arrows;
}
