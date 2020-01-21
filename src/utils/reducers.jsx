// @format
// NOTES
// We generally use Object.assign at the base level, as spread {...} is shallow only

import {vertexAdder} from './vertexHelpers';

const controlDiagram = (state, action) => {
  const loc_fulltext = `${state.location}_fulltext`;
  const loc_library = `${state.location}_library`;
  const loc_vertices = `${state.location}_vertices`;
  switch (action.type) {
    case 'SET_STATE':
      return action.state;
    case 'MODIFY_STATE':
      console.log('State update:', action.update);
      const modify_result = Object.assign({}, state, action.update);
      console.log('State result:', modify_result);
      return modify_result;
    case 'NAVIGATE':
      return Object.assign({}, state, {location: action.location});
    case 'ADD_SAVED':
      const add_result = vertexAdder(state, action.vertexgroups);
      return Object.assign({}, state, add_result);
    case 'ADD_VERTEX':
      const fulltext = state[loc_library][action.section].text;
      return Object.assign({}, state, {
        [loc_vertices]: state[loc_vertices].concat({
          name: action.section,
          children: [],
          parents: [],
          sections: [action.section],
        }),
        [loc_fulltext]: {
          ...state[loc_fulltext],
          [state[loc_vertices].length]: fulltext,
        },
      });
    case 'CHANGE_VERTEX_NAME':
      return Object.assign({}, state, {
        [loc_vertices]: state[loc_vertices].map((vertex, index) => {
          if (action.id === index) {
            return Object.assign({}, vertex, {name: action.name});
          }
          return vertex;
        }),
      });
    case 'SET_TEXT':
      switch (action.editor) {
        case 'vertex':
          return Object.assign({}, state, {
            [loc_fulltext]: {
              ...state[loc_fulltext],
              [state.focus]: action.text,
            },
          });
        default:
          return Object.assign({}, state, {
            [loc_library]: {
              ...state[loc_library],
              [action.editor]: Object.assign(
                {},
                state[loc_library][action.editor],
                {text: action.text},
              ),
            },
          });
      }
    case 'ADD_SECTION':
      const newtext =
        state[loc_fulltext][action.target] +
        state[loc_library][action.section].text;
      return Object.assign({}, state, {
        [loc_vertices]: state[loc_vertices].map((vertex, index) => {
          if (action.target === index) {
            return Object.assign({}, vertex, {
              sections: vertex.sections.concat([action.section]),
            });
          }
          return vertex;
        }),
        [loc_fulltext]: {...state[loc_fulltext], [action.target]: newtext},
      });
    case 'REMOVE_SECTION':
      return Object.assign({}, state, {
        [loc_vertices]: state[loc_vertices].map((vertex, index) => {
          if (action.vertex === index) {
            return Object.assign({}, vertex, {
              sections: vertex.sections.filter(
                value => value !== action.section,
              ),
            });
          }
          return vertex;
        }),
      });
    case 'REMOVE_ALL_SECTIONS':
      return Object.assign({}, state, {
        [loc_vertices]: state[loc_vertices].map((vertex, index) => {
          if (action.vertex === index) {
            return Object.assign({}, vertex, {sections: []});
          }
          return vertex;
        }),
        [loc_fulltext]: {...state[loc_fulltext], [state.focus]: ''},
      });
    case 'REMOVE_VERTEX':
      return Object.assign({}, state, {
        focus: null,
        [loc_vertices]: state[loc_vertices].reduce((result, vertex, index) => {
          if (action.vertex !== index) {
            result.push(
              Object.assign({}, vertex, {
                children: vertex.children.reduce((result, child) => {
                  if (child < action.vertex) {
                    result.push(child);
                  } else if (child > action.vertex) {
                    result.push(child - 1);
                  }
                  return result;
                }, []),
                parents: vertex.parents.reduce((result, parent) => {
                  if (parent < action.vertex) {
                    result.push(parent);
                  } else if (parent > action.vertex) {
                    result.push(parent - 1);
                  }
                  return result;
                }, []),
              }),
            );
          }
          return result;
        }, []),
      });
    case 'LINK_VERTEX':
      return Object.assign({}, state, {
        [loc_vertices]: state[loc_vertices].map((vertex, index) => {
          if (action.target === index) {
            return Object.assign({}, vertex, {
              children: vertex.children.concat([action.source]),
            });
          }
          if (action.source === index) {
            return Object.assign({}, vertex, {
              parents: vertex.parents.concat([action.target]),
            });
          }
          return vertex;
        }),
      });
    case 'UNLINK_VERTEX':
      return Object.assign({}, state, {
        [loc_vertices]: state[loc_vertices].map((vertex, index) => {
          if (action.target === index) {
            return Object.assign({}, vertex, {
              children: vertex.children.filter(
                value => value !== action.source,
              ),
            });
          }
          if (action.source === index) {
            return Object.assign({}, vertex, {
              parents: vertex.parents.filter(value => value !== action.target),
            });
          }
          return vertex;
        }),
      });
    default:
      return state;
  }
};

export default controlDiagram;
