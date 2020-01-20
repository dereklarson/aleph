// @format
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Interface from './Interface';
import rootReducer from './utils/reducers';
import {initState} from './utils/stateReference';
import {HotKeys} from 'react-hotkeys';

// The redux store maintains all state, with thunk handling async updates
const store = createStore(rootReducer, initState, applyMiddleware(thunk));
// Set to a dark theme simply
const theme = createMuiTheme({palette: {type: 'light'}});

const keyMap = {
  DELETE_NODE: ['del', 'backspace'],
};

// Main render connects the redux store and DragNDrop providers
render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <HotKeys keyMap={keyMap}>
          <Interface />
        </HotKeys>
      </ThemeProvider>
    </DndProvider>
  </Provider>,
  document.getElementById('root'),
);
