import React from 'react';
import NodeVertex from './NodeVertex';

export default {
  component: NodeVertex,
  title: 'NodeVertex',
  excludeStories: /.*Data$/,
};

export const nodeData = {
  name: 'Yo',
  sections: ['react'],
  id: 1,
  styleProps: {
    highlighted: true,
  }
}

export const text = () => <NodeVertex {...nodeData} name='sup' />;
