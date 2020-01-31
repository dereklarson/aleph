// @format
import axios from 'axios';
import _ from 'lodash';
import {requestOrg} from '@utils/state';
import {modify} from '@data/reducers';

// Thunked: will return function taking dispatch
export function pushImages(config, match_string = '') {
  let org = _.cloneDeep(config.organization);
  return async function(dispatch, getState) {
    console.log('---Loading Inputs ---');
    axios.post('/docker/push/', {match_string}).then(response => {
      dispatch(modify('context', response.data));
    });
  };
}

export function getImages() {
  return function(dispatch) {
    console.log(`---Loading Docker Images---`);
    axios.get('/docker/list/').then(response => {
      dispatch(modify('operations', response.data));
    });
  };
}

export function pushOrg() {
  return function(dispatch, getState) {
    let org = getState()['config']['organization'];
    console.log(`---Pushing to Organization Repo---`);
    let branch = 'test_branch';
    let commit_msg = 'test_commit';
    axios
      .post(`/repo/push/${org.uid}`, {
        branch,
        commit_msg,
        repository: org.repository,
      })
      .then(response => {
        dispatch(modify('config', response.data));
      });
  };
}
