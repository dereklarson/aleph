import { configure } from '@storybook/react';

configure(require.context('../src/stories', true, /\.stories\.jsx$/), module);
