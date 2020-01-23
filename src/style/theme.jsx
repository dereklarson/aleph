// @format
import {createMuiTheme} from '@material-ui/core/styles';
import {purple} from '@material-ui/core/colors';

export const lightTheme = createMuiTheme({
  palette: {type: 'light', primary: purple},
});

export const darkTheme = createMuiTheme({
  palette: {type: 'dark', primary: purple},
});

export const testTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff4400',
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast bkgrd/text
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

export const themePicker = {
  light: lightTheme,
  dark: darkTheme,
  new: testTheme,
};
