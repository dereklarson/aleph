// @format
import {makeStyles} from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingLeft: theme.spacing(10),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  title: {
    flexGrow: 1,
  },
  chipDepot: {
    width: '100%',
    zIndex: 1,
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
  childHandle: {
    borderRadius: 24,
    height: '15px',
    opacity: 0.5,
    width: '100%',
    zIndex: 6,
  },
  drawerPaper: {
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  paperDrawing: {
    position: 'relative', // Let's us use coordinates to draw the Diagram
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  textField: {},
  editor: {
    minWidth: '40vh',
    width: '100%',
  },
}));
