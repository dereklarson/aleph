import {createSelector} from 'reselect';

// We create this selector to ensure no infinite reloading due to having the
// .map() call in our state mapping, which will always seem new to React.
const getFocus = state => state.context.focus;
const getLocation = state => state.context.location;
const getBuildOrders = state => state.operations.build_orders;

const getActivity = createSelector(
  [getFocus, getLocation, getBuildOrders, getDagre],
  (focus, location, buildOrders) => ({
    focus: focus,
    location: location,
    prepared: buildOrders.map(({uid}) => uid),
  }),
);

export default connect(
  state => ({
    location: state.context.location,
    vertices: state.vertices[state.context.location],
    activity: getActivity(state),
  }),
  dispatch => ({
    clearFocus: () => dispatch(modify('context', {focus: null})),
    onDepotDrop: payload => dispatch(addNewVertex(payload)),
  }),
)(PureDiagram);
