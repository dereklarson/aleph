// @format
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
// import _ from 'lodash';

// Mock the axios adapter for dev purposes
export var mock = new MockAdapter(axios, { delayResponse: 1000 });

// From operations/load
mock.onGet("/input").reply(200, {});

mock.onPost("/coreload/").reply(200, {});

// From operations/build
mock.onPost("/gen_build/docker").reply(config => {
  let data = JSON.parse(config.data);
  console.log("Request:", data);
  return [
    200,
    {
      build_orders: [
        { uid: "parent", text: "Build 1" },
        { uid: "child", text: "Build 2" },
        { uid: "gkid", text: "Build 3" },
        { uid: "child", text: "Build 4" }
      ]
    }
  ];
});

mock.onPost("/build2").reply(async function(config) {
  console.log("get2");
  await axios.get("http://127.0.0.1:5000/build");
  console.log("done");
});

mock.onPost("/build/docker").reply(config => {
  let data = JSON.parse(config.data);
  console.log("Request:", data);
  if (data.build_context.uid === "gkid") {
    return [200, { code: 1, logs: "error" }];
  } else {
    return [200, { code: 0, logs: "success" }];
  }
});
