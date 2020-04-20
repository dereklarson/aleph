// @format
import axios from "axios";
// import openSocket from "socket.io-client";
import _ from "lodash";
import { getLastLine } from "@utils/helpers";
import { blankOperations } from "@data/reference";
import { modify } from "@data/reducers";
import { getBuildData } from "@data/tools";

export function build2(cancel) {
  return async function(dispatch, getState) {
    const state = getState();
    const location = state.context.location;
    const { vertices, corpus, metadata } = getBuildData(state);

    console.log(`---Building ${location} from Focus---`);
    let build_orders = [];
    await axios
      // .post("/gen_build/docker", { vertices, corpus, metadata })
      .post("/gen_build2/docker", {
        vertices,
        corpus,
        metadata
      })
      .then(response => {
        build_orders = response.data.build_orders;
      });
    console.log("---Building Docker Image---");
    for (const build_context of build_orders) {
      dispatch(
        modify("operations", {
          tickertext: build_context.uid,
          building: build_context.uid
        })
      );
      if (cancel.current === true) {
        cancel.current = false;
        console.log("Canceling Build before id:", build_context.uid);
        break;
      }
      console.log("Sending:", build_context, metadata);
      await axios.post("/build2/docker", { build_context, metadata });
    }
    dispatch(modify("operations", blankOperations));
  };
}

export function build(cancel) {
  return async function(dispatch, getState) {
    const state = getState();
    const location = state.context.location;
    let current_cache = state.cache.build;
    let new_cache = {};
    const { vertices, corpus, metadata } = getBuildData(state);

    console.log(`---Building ${location} from Focus---`);
    if (location === "docker") {
      let build_orders = [];
      await axios
        .post("/gen_build/docker", { vertices, corpus, metadata })
        .then(response => {
          build_orders = response.data.build_orders;
        });
      console.log("---Building Docker Image---");
      for (const [index, step] of build_orders.entries()) {
        if (cancel.current === true) {
          cancel.current = false;
          console.log("Canceling Build before step id:", step.uid);
          break;
        }
        dispatch(
          modify("operations", {
            build_orders,
            tickertext: getLastLine(step.text),
            percent: Math.floor((100 * index) / build_orders.length),
            building: step.uid
          })
        );
        if (_.has(current_cache, step.hash)) {
          continue;
        }
        await axios
          .post("/build/docker", { build_order: step })
          .then(response => {
            if (response.data.code > 0) {
              console.log(
                "Canceling",
                step.uid,
                "b.c. error",
                response.data.code
              );
              cancel.current = true;
            }
            dispatch(modify("operations", response.data));
          });
        new_cache[step.hash] = true;
        dispatch(
          modify("cache", { build: { ...current_cache, ...new_cache } })
        );
      }
      dispatch(modify("operations", blankOperations));
    } else if (["pipeline", "dash"].includes(location)) {
      dispatch(modify("operations", { percent: 0 }));
      let build_context = {};
      await axios
        .post(`/gen_build/${location}`, { vertices, corpus, metadata })
        .then(response => {
          build_context = response.data.build_context;
        });
      dispatch(modify("operations", { percent: 50 }));
      await axios
        .post(`/build/${location}`, { build_context, metadata })
        .then(response => {
          console.log("...built");
        });
      dispatch(modify("operations", { percent: 100 }));
    } else {
      console.log("Only dash, docker and pipeline builds supported");
    }
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
