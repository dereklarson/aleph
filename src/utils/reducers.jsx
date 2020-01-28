// @format
// NOTES
// We generally use Object.assign at the base level, as spread {...} is shallow only

import undoable from 'redux-undo';
import {vertexAdder} from './vertexHelpers';
import _ from 'lodash';
import {initState} from './stateReference';
// import {combineReducers} from 'redux';

const config = (state, action) => {
  switch (action.type) {
    case 'MODIFY_CONFIG':
      return Object.assign({}, state, action.update);
    default:
      return state;
  }
};

const operations = (state, action) => {
  switch (action.type) {
    case 'MODIFY_OPERATIONS':
      return Object.assign({}, state, action.update);
    default:
      return state;
  }
};

const cache = (state, action) => {
  switch (action.type) {
    case 'MODIFY_CACHE':
      return Object.assign({}, state, action.update);
    default:
      return state;
  }
};

const context = (state, action) => {
  switch (action.type) {
    case 'NAVIGATE':
      return Object.assign({}, state, {location: action.location});
    case 'MODIFY_CONTEXT':
      return Object.assign({}, state, action.update);
    default:
      return state;
  }
};

const library = (state, action) => {
  switch (action.type) {
    case 'MODIFY_LIBRARY':
      return Object.assign({}, state, action.update);
    case 'WRITE_TEXT':
      return Object.assign({}, state, {
        [action.location]: {
          ...state[action.location],
          [action.editor]: Object.assign(
            {},
            state[action.location][action.editor],
            {text: action.text},
          ),
        },
      });
    default:
      return state;
  }
};

const corpus = (state, action) => {
  switch (action.type) {
    case 'SET_TEXT':
      return Object.assign({}, state, {
        [action.location]: {
          ...state[action.location],
          [state.context.focus]: action.text,
        },
      });
    default:
      return state;
  }
};

const diagrams = (state, action) => {
  switch (action.type) {
    case 'MODIFY_DIAGRAMS':
      return Object.assign({}, state, action.update);
    default:
      return state;
  }
};

const verticesbase = (state, action) => {
  switch (action.type) {
    case 'MODIFY_VERTICES':
      return Object.assign({}, state, action.update);
    case 'ADD_DIAGRAMS':
      const add_result = vertexAdder(state, action.vertexgroups);
      return Object.assign({}, state, add_result);
    case 'ADD_VERTEX':
      return Object.assign({}, state, {
        [action.location]: state[action.location].concat({
          name: action.section,
          children: [],
          parents: [],
          sections: [action.section],
        }),
      });
    case 'CHANGE_VERTEX_NAME':
      return Object.assign({}, state, {
        [action.location]: state[action.location].map((vertex, index) => {
          if (action.id === index) {
            return Object.assign({}, vertex, {name: action.name});
          }
          return vertex;
        }),
      });
    case 'ADD_SECTION':
      return Object.assign({}, state, {
        [action.location]: state[action.location].map((vertex, index) => {
          if (action.target === index) {
            return Object.assign({}, vertex, {
              sections: vertex.sections.concat([action.section]),
            });
          }
          return vertex;
        }),
      });
    case 'REMOVE_SECTION':
      return Object.assign({}, state, {
        [action.location]: state[action.location].map((vertex, index) => {
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
        [action.location]: state[action.location].map((vertex, index) => {
          if (action.vertex === index) {
            return Object.assign({}, vertex, {sections: []});
          }
          return vertex;
        }),
      });
    case 'REMOVE_VERTEX':
      return Object.assign({}, state, {
        [action.location]: state[action.location].reduce(
          (result, vertex, index) => {
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
          },
          [],
        ),
      });
    case 'LINK_VERTEX':
      return Object.assign({}, state, {
        [action.location]: state[action.location].map((vertex, index) => {
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
        [action.location]: state[action.location].map((vertex, index) => {
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

function combineReducers(reducers) {
  return function(state, action) {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
}

// Give some parts of the store TimeTravel
const vertices = undoable(verticesbase);
// const config = undoable(confbase);

// Combine all reducers
const rootReducer = combineReducers({
  context,
  operations,
  cache,
  config,
  vertices,
  library,
  corpus,
  diagrams,
});

export default rootReducer;
