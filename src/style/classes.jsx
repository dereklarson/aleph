// @format
import {makeStyles} from '@material-ui/core/styles';

const devmode = process.env.NODE_ENV === 'production' ? false : true;
console.log('Devmode:', devmode);

export const useStyles = makeStyles(theme => ({
  root: {},
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    whiteSpace: 'nowrap',
    width: 240,
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    paddingLeft: theme.spacing(5), // Space between sidebar and workspace
    paddingTop: theme.spacing(7), // Space between app bar and workspace
  },
  ticker: {
    textAlign: 'center',
    backgroundColor: theme.palette.grey[500],
  },
  chipDepot: {
    width: '100%',
    border: '1px solid grey',
  },
  listItem: {
    overflow: 'auto', // Handles long user-generated names for saved diagrams
  },
  badge: {},
  linkHandle: {
    borderRadius: 24,
    height: theme.spacing(3),
    opacity: 0.5,
    width: '100%',
    zIndex: 6,
  },
  paperDrawing: {
    position: 'relative', // Let's us use coordinates to draw the Diagram
  },
  avatar: {
    margin: theme.spacing(-0.5),
    width: theme.spacing(4),
    height: theme.spacing(4),
    zIndex: 1,
  },
  vertex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    border: devmode ? '1px dashed red' : '',
  },
  tickerActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    overflow: 'auto',
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  table: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: theme.spacing(1),
  },
  oofTooltip: {
    maxHeight: 100,
    maxWidth: 200,
  },
  testTooltip: {
    maxHeight: 400,
    maxWidth: 700,
  },
  textField: {},
  editor: {
    minWidth: 700, // This will ensure ~88 characters a line on all screens
  },
  node: {
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.light,
    borderRadius: 24,
    padding: '12px',
    display: 'flex',
    minHeight: 50,
    maxWidth: 200,
  },
  box: {
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.light,
    borderRadius: 24,
    padding: '12px',
    display: 'flex',
    minHeight: 50,
    maxWidth: 200,
  },
}));
