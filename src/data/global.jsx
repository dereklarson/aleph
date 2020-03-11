// @format
import _ from 'lodash';
import {vertexDataFromPaths} from '@utils/vertex';
import {genLibrary} from '@data/dev';

export const globalData = {
  battery: {
    styles: {
      node: {
        uid: 'node',
        type: 'shape',
        text: `{"backgroundColor": "gray",
          "borderRadius": "25px",
          "height": "50px",
          "width": "120px"
        }`,
      },
    },
  },
};

export const globalDevData = {
  associations: {
    library: {parent: ['parent'], child: ['child', 'friend']},
    styles: {parent: ['node'], child: ['store']},
    datasets: {},
  },
  environment: {
    test_output: {parent: 'yo\ndude'},
  },
  vertices: vertexDataFromPaths([['parent', 'child']]),
  battery: {
    library: genLibrary(['parent', 'child', 'gkid']),
    styles: {
      node: _.cloneDeep(globalData.battery.styles.node),
      store: {
        uid: 'store',
        type: 'shape',
        text: `{"backgroundColor": "gray",
              "borderRadius": "50%",
              "height": "80px",
              "width": "80px"
            }`,
      },
      green_triangle: {
        uid: 'green_triangle',
        type: 'shape',
        text: `{"backgroundColor": "transparent",
            "width": "80px",
            "height": "0px",
            "padding": "0",
            "borderRadius": "0",
            "borderLeft": "25px solid transparent",
            "borderRight": "25px solid transparent",
            "borderBottom": "80px solid green"
            }`,
      },
    },
  },
};
