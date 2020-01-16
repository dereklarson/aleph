// @format

export const initState = {
  // Test variables
  dagre: false,
  // Context
  focus: null,
  location: 'docker',
  editor: false,
  // Operations
  tickertext: 'Ticker',
  percent: 100,
  build_orders: [],
  build_cache: [],
  // Core
  docker_vertices: [],
  pipeline_vertices: [
    {
      name: 'parent',
      children: [1],
      parents: [],
      sections: [],
    },
    {
      name: 'child',
      children: [],
      parents: [0],
      sections: [],
    },
  ],
  data_vertices: [],
  configuration_vertices: [
    {
      name: 'control',
      children: [1, 2],
      parents: [],
      sections: [],
    },
    {
      name: 'worker',
      children: [],
      parents: [0],
      sections: [],
    },
    {
      name: 'dev',
      children: [],
      parents: [0],
      sections: [],
    },
  ],
  docker_library: {
    docker_sample: {
      name: 'docker_sample',
      dependencies: [],
      text: '#Docker text will be here\n',
    },
  },
  pipeline_library: {
    pipe_sample: {
      name: 'pipe_sample',
      dependencies: [],
      text: '//Pipeline code will be here\n',
    },
  },
  data_library: {
    data_sample: {
      name: 'data_sample',
      dependencies: [],
      text: '//Data model crap be here\n',
    },
  },
  configuration_library: {
    data_sample: {
      name: 'data_sample',
      dependencies: [],
      text: '//Data model crap be here\n',
    },
  },
  docker_saved: {},
  pipeline_saved: {},
  data_saved: {},
  configuration_saved: {},
  docker_fulltext: new Map(),
  pipeline_fulltext: new Map(),
  data_fulltext: new Map(),
  configuration_fulltext: new Map(),
};

export const tutorialInitialState = {
  dagre: false,
  focus: null,
  location: 'docker',
  tickertext: 'Ticker',
  percent: 100,
  build_orders: [],
  docker_vertices: [],
  docker_fulltext: new Map(),
};

export const noBuildState = {
  building: null,
  build_orders: [],
  tickertext: 'Ticker',
  percent: 100,
};
