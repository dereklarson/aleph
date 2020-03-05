// @format
import React from 'react';
import {connect} from 'react-redux';
import {Button, Card, Chip, Paper, TextField} from '@material-ui/core';
import {CardActionArea, CardActions, CardContent} from '@material-ui/core';
import _ from 'lodash';
import {build} from '@ops/build';
import {genCodeEdit} from '@utils/state';
import {removeAssn, removeAllAssns, retitleVertex} from '@data/combined';
import {setText} from '@data/reducers';
import {createText} from '@data/tools';
import {titlize, propsToStyle} from '@utils/helpers';
import {useStyles} from '@style/classes';

export function PureCardVertex({
  location,
  library,
  corpus,
  uid,
  idlist,
  libAssns,
  operations,
  styleProps,
  dispatch,
}) {
  const classes = useStyles();
  const [uidText, setUid] = React.useState(uid);
  const [textErr, setErr] = React.useState(false);
  const cancel = React.useRef(false);

  let chipDisplay = [];
  let libError = false;
  for (const [index, association] of libAssns.entries()) {
    let libraryMissing = !_.has(library, association);
    libError = libError || libraryMissing;
    const chipDelete = () =>
      dispatch(removeAssn({location, uid, atype: 'library', association}));
    chipDisplay.push(
      <Chip
        key={index}
        label={titlize(association)}
        color={libraryMissing ? 'secondary' : 'default'}
        onDelete={chipDelete}
      />,
    );
  }

  let edittext = '';
  let editfunc = () => 0;
  if (!libError) {
    edittext = createText({library, libAssns, corpus, uid});
    editfunc = ({fieldText, aceText}) =>
      setText({location, uid, text: aceText});
  }

  const onBuildClick = () => {
    if (operations.building !== null) cancel.current = true;
    else dispatch(build(cancel));
  };

  let buildTitle = operations.building ? 'Cancel' : 'Build';
  let helperText = textErr ? 'Already in use' : '<Enter> to set';
  return (
    <Card
      style={propsToStyle(styleProps)}
      onClick={event => event.stopPropagation()}>
      <CardActionArea>
        <CardContent>
          <TextField
            label="Vertex name"
            defaultValue={uid}
            error={textErr}
            helperText={uid === uidText ? '' : helperText}
            margin="dense"
            size="small"
            onKeyPress={event => {
              if (!textErr && event.key === 'Enter') {
                dispatch(
                  retitleVertex({location, uid, newId: event.target.value}),
                );
              }
            }}
            onChange={event => {
              setUid(event.target.value);
              setErr(idlist.includes(event.target.value));
            }}
          />
          <Paper className={classes.paper}>{chipDisplay}</Paper>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          onClick={() =>
            dispatch(genCodeEdit('nodeEdit', {edittext, editfunc}))
          }>
          Editor
        </Button>
        <Button size="small" onClick={onBuildClick}>
          {buildTitle}
        </Button>
        <Button
          size="small"
          onClick={() => dispatch(removeAllAssns({location, uid}))}>
          Reset
        </Button>
      </CardActions>
    </Card>
  );
}

export default connect(state => ({
  operations: state.operations,
  location: state.context.location,
  library: state.battery[state.context.location].library,
  corpus: state.corpus[state.context.location],
}))(PureCardVertex);
