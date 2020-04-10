// @format
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// import _ from 'lodash';

// Mock the axios adapter for dev purposes
export var mock = new MockAdapter(axios, {delayResponse: 2000});

// From operations/load
mock.onGet('/input').reply(200, {});

mock.onPost('/coreload/').reply(200, {});

// From operations/build
mock.onPost('/gen_build/docker').reply(config => {
  let data = JSON.parse(config.data);
  console.log('Request:', data);
  return [
    200,
    {
      build_orders: [
        {uid: 1, text: 'Build 1'},
        {uid: 2, text: 'Build 2'},
        {uid: 3, text: 'Build 3'},
        {uid: 4, text: 'Build 4'},
      ],
    },
  ];
});

mock.onPost('/build/docker').reply(config => {
  let data = JSON.parse(config.data);
  console.log('Request:', data);
  if (data.build_order.uid === 3) {
    return [200, {code: 1, logs: 'error'}];
  } else {
    return [200, {code: 0, logs: 'success'}];
  }
});
