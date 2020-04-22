// @format
import React from "react";
import { connect } from "react-redux";
import { List, ListSubheader } from "@material-ui/core";
import _ from "lodash";
import { modify } from "@data/reducers";
import { saveDiagram, loadOrg, pushOrg, pushImages } from "@ops/load";
import { runPipeline } from "@ops/build";
import { generateList } from "@utils/generateList";
import { genTextEdit, genCodeEdit } from "@utils/state";

function BulkActions({ organization, environment, location, dispatch }) {
  const saveDiag = text => saveDiagram(location, text.fieldText.savename);
  const baseOptions = [
    ["save_diagram", () => dispatch(genTextEdit("saveDiagram", saveDiag))]
  ];
  const orgSet = text => modify("config", { organization: text.fieldText });
  const orgCommit = {
    edittext: "Insert Commit Msg",
    editfunc: ({ fieldText, aceText }) =>
      pushOrg({ branch: fieldText.branch, commit_msg: aceText })
  };
  const imagePusher = text => pushImages(organization, text.fieldText.match);
  const testmode = environment.testing;
  const locationOptions = {
    configuration: [
      ["set_org", () => dispatch(genTextEdit("fetchOrg", orgSet))],
      ["load_org", () => dispatch(loadOrg(organization))],
      ["push_org", () => dispatch(genCodeEdit("commit", orgCommit))]
    ],
    data: [],
    dash: [],
    docker: [
      ["push_images", () => dispatch(genTextEdit("pushImages", imagePusher))]
    ],
    pipeline: [
      [
        "test_mode",
        () =>
          dispatch(
            modify("environment", { locator: [location], testing: !testmode })
          )
      ],
      ["run_pipeline", () => dispatch(runPipeline())]
    ]
  };

  const actionOptions = baseOptions.concat(
    _.get(locationOptions, location, [])
  );
  return (
    <List>
      <ListSubheader inset>Actions</ListSubheader>
      {generateList("list", actionOptions)}
    </List>
  );
}

export default connect(state => ({
  environment: state.environment[state.context.location],
  organization: state.config.organization,
  location: state.context.location
}))(BulkActions);
