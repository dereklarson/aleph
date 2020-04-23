// @format
import axios from "axios";
// import openSocket from "socket.io-client";
import _ from "lodash";
import { getLastLine } from "@utils/helpers";
// import { blankOperations } from "@data/reference";
import { modify } from "@data/reducers";
import { getBuildData } from "@data/tools";

export function build(cancel) {
  return async function(dispatch, getState) {
    const state = getState();
    const location = state.context.location;
    const { vertices, corpus, metadata } = getBuildData(state);
    let build_context = {};
    console.log(`---Building ${location} from Focus---`);
    // First supply the diagram data to our Python backend which can generate
    // a context which contains the information needed to build the desired output
    await axios
      .post(`/gen_build/${location}`, { vertices, corpus, metadata })
      .then(response => {
        build_context = response.data.build_context;
      });
    if (location === "docker") {
      console.log("---Building Docker Image---");
      for (const stage_context of build_context.build_orders) {
        // As building progresses, we update the Ticker component
        // This has a one-line text field and a progress bar
        dispatch(
          modify("operations", {
            build_orders: build_context.build_orders,
            tickertext: "Building: " + stage_context.uid,
            building: stage_context.uid,
            percent: 0
          })
        );
        // Capture user initiated cancel requests (docker builds can be lengthy)
        if (cancel.current === true) {
          cancel.current = false;
          console.log("Canceling Build before id:", stage_context.uid);
          break;
        }
        console.log("Sending:", stage_context, metadata);
        // Use SSE to track build progress.
        var eventSource = new EventSource("/buildstream");
        eventSource.onmessage = function(msg) {
          let data = JSON.parse(msg.data);
          dispatch(
            modify("operations", {
              tickertext: data.text,
              percent: Math.floor(100 * data.completion)
            })
          );
        };
        await axios
          .post("/build/docker", {
            build_context: stage_context,
            metadata
          })
          .then(response => {
            dispatch(modify("operations", response.data));
          });
        eventSource.close();
      }
    } else if (["pipeline", "dash"].includes(location)) {
      await axios
        .post(`/build/${location}`, { build_context, metadata })
        .then(response => {
          console.log("...built");
        });
    } else {
      console.log("Only dash, docker and pipeline builds supported");
    }
    dispatch(
      modify("operations", { building: null, build_orders: [], percent: 100 })
    );
  };
}

export function runPipeline() {
  return async function(dispatch, getState) {
    let state = getState();
    let location = state.context.location;
    let metadata = {
      name: state.environment[location].envName
    };
    if (location === "pipeline") {
      console.log("---Running Pipeline---");
      await axios.post("/run/pipeline", { metadata }).then(response => {
        dispatch(modify("operations", response.data));
      });
    }
  };
}
