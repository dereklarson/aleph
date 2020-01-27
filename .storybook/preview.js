import { configure } from '@storybook/react';
import { addParameters } from '@storybook/react';

configure(require.context('../src/stories', true, /\.stories\.jsx$/), module);

addParameters({
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
});
