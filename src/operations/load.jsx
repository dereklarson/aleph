import axios from "axios";
import _ from "lodash";
import { genTextEdit } from "@utils/state";
import {
  modify,
  removeDiagram,
  loadDiagramVertices,
  loadDiagramAssociations,
  loadDiagramCorpus
} from "@data/reducers";

// All of these are thunked to give access to state and asynchronicity
export function saveBattery({ location, bank, uid }) {
  return function(dispatch, getState) {
    console.log(`---Saving ${location} ${bank}---`);
    let state = getState();
    const path_list = ["battery", location, bank];
    const libraryElement = state.battery[location][bank][uid];
    axios.post("/save/", { path_list, uid, state: libraryElement });
  };
}

export function saveDiagram(location, uid) {
  return function(dispatch, getState) {
    console.log(`---Saving ${location} Diagram---`);
    let state = getState();
    const path_list = ["diagrams", location];
    const savedState = {
      vertices: state.vertices[location],
      associations: state.associations[location],
      corpus: state.corpus[location]
    };
    dispatch(modify("environment", { locator: [location], envName: uid }));
    axios.post("/save/", { path_list, uid, state: savedState });
  };
}

export function deleteSavedDiagram({ location, uid }) {
  return async function(dispatch) {
    dispatch(removeDiagram({ location, uid }));
    const path_list = ["diagrams", location];
    axios.post(`/delete/`, { path_list, uid });
  };
}

export function loadOrg() {
  return function(dispatch, getState) {
    let org = getState()["config"]["organization"];
    console.log(`---Loading Organization---`);
    axios
      .post(`/repo/pull/${org.uid}`, { repository: org.repository })
      .then(response => {
        dispatch(modify("config", response.data));
      });
  };
}

export function pushOrg({ branch, commit_msg }) {
  return function(dispatch, getState) {
    let org = getState()["config"]["organization"];
    console.log(`---Pushing to Organization Repo---`);
    axios
      .post(`/repo/push/${org.uid}`, {
        branch,
        commit_msg,
        repository: org.repository
      })
      .then(response => {
        dispatch(modify("config", response.data));
      });
  };
}

export function loadCore(source, locator) {
  return function(dispatch, getState) {
    let org = getState()["config"]["organization"];
    console.log(`---Loading ${source} ${locator.join("/")}---`);
    let path_list = [source, ...locator];
    axios.post("/coreload/", { path_list, org: org.uid }).then(response => {
      let payload = { ...response.data, locator };
      dispatch(modify(source, payload));
    });
  };
}

export function loadDiagram({ location, content, uid }) {
  return async function(dispatch, getState) {
    let content = getState().diagrams[location][uid];
    dispatch(modify("vertices", { [location]: {} }));
    dispatch(modify("associations", { [location]: {} }));
    dispatch(modify("corpus", { [location]: {} }));
    dispatch(loadDiagramVertices({ location, content, uid }));
    dispatch(loadDiagramAssociations({ location, content, uid }));
    dispatch(loadDiagramCorpus({ location, content, uid }));
    dispatch(modify("environment", { locator: [location], envName: uid }));
  };
}

function delay(millis) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("resolved");
    }, millis);
  });
}

export function loadInputs(config) {
  let org = _.cloneDeep(config.organization);
  const savefunc = text => modify("config", { organization: text.fieldText });
  console.log("--- Performing Initial Data Load ---");
  return async function(dispatch, getState) {
    console.log("  -Loading Inputs-");
    await axios.get("/input").then(response => {
      dispatch(modify("config", response.data));
      Object.assign(org, _.get(response.data, "organization", {}));
      if (org.name.includes("<")) {
        console.log("Requesting org...");
        dispatch(genTextEdit("fetchOrg", savefunc));
      }
    });
    console.log("  -Loading each source/location-");
    await Promise.all([
      dispatch(loadCore("battery", ["docker", "library"])),
      dispatch(loadCore("battery", ["pipeline", "library"])),
      dispatch(loadCore("battery", ["pipeline", "datasets"])),
      dispatch(loadCore("battery", ["dash", "library"])),
      dispatch(loadCore("diagrams", ["docker"])),
      dispatch(loadCore("diagrams", ["pipeline"])),
      dispatch(loadCore("diagrams", ["dash"])),
      delay(1000)
    ]);
    console.log("  -Loading user checkpoint-");
    dispatch(loadCheckpoint("user"));
  };
}

export function saveCheckpoint(name) {
  return function(dispatch, getState) {
    console.log("---Saving Full State Checkpoint---");
    let { context, ...saveState } = getState();
    axios.post(`/checkpoint/save/${name}`, saveState);
  };
}

export function loadCheckpoint(name) {
  return function(dispatch) {
    console.log("---Loading Full State Checkpoint---");
    axios.get(`/checkpoint/load/${name}`).then(response => {
      dispatch(modify("vertices", response.data.vertices));
      dispatch(modify("associations", response.data.associations));
      dispatch(modify("corpus", response.data.corpus));
    });
  };
}

export function getImages() {
  return function(dispatch) {
    console.log(`---Loading Docker Images---`);
    axios.get("/docker/list").then(response => {
      dispatch(modify("operations", response.data));
    });
  };
}

// Thunked: will return function taking dispatch
export function pushImages(organization, match_string) {
  return async function(dispatch, getState) {
    console.log("---Pushing Docker images ---");
    axios
      .post("/docker/push", { organization, match_string })
      .then(response => {
        dispatch(modify("operations", response.data));
      });
  };
}
