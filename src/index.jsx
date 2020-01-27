// @format
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {HotKeys} from 'react-hotkeys';
import Interface from '@comp/Interface';
import rootReducer from 'utils/reducers';
import {initState} from 'utils/stateReference';

// The redux store maintains all state, with thunk handling async updates
const store = createStore(rootReducer, initState, applyMiddleware(thunk));

const keyMap = {
  DELETE_NODE: ['del', 'backspace'],
};

// Main render connects the redux store and DragNDrop providers
render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <HotKeys keyMap={keyMap}>
        <Interface />
      </HotKeys>
    </DndProvider>
  </Provider>,
  document.getElementById('root'),
);
