// @format
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {HotKeys} from 'react-hotkeys';
import Interface from '@comp/Interface';
import rootReducer from '@data/reducers';
import {initState} from '@data/reference';

const logger = createLogger({
  collapsed: (getState, action) => action.type === 'context/modify_context',
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger],
  preloadedState: initState,
});

console.log("Initial State:", initState);

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
