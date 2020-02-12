// @format
import React from 'react';
import {connect} from 'react-redux';
import {Button, Card, Chip, Paper, TextField} from '@material-ui/core';
import {CardActionArea, CardActions, CardContent} from '@material-ui/core';
import _ from 'lodash';
import {build} from '@ops/build';
import {genCodeEdit} from '@utils/state';
import {
  removeAssociation,
  removeAllAssociations,
  relinkAssociations,
  renameVertex,
  setText,
  clearText,
} from '@data/reducers';
import {createText} from '@data/tools';
import {titlize, propsToStyle} from '@utils/helpers';
import {useStyles} from '@style/styling';

export function PureCardVertex({
  location,
  library,
  corpus,
  onBuild,
  onEditor,
  onClear,
  onChange,
  onChipDelete,
  uid,
  idlist,
  associations,
  operations,
  styleProps,
}) {
  const classes = useStyles();
  const [uidText, setUid] = React.useState(uid);
  const [textErr, setErr] = React.useState(false);

  const cancel = React.useRef(false);

  let chipDisplay = [];
  let libError = false;
  for (const [index, association] of associations.entries()) {
    let libraryMissing = !_.has(library, association);
    libError = libError || libraryMissing;
    const chipDelete = () => onChipDelete({location, uid, association});
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
    edittext = createText({library, associations, corpus, uid});
    editfunc = text => setText({location, uid, text: text['_editor']});
  }

  const onBuildClick = () => {
    if (operations.building !== null) cancel.current = true;
    else onBuild(cancel);
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
                onChange({location, uid, newId: event.target.value});
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
        <Button size="small" onClick={() => onEditor({edittext, editfunc})}>
          Editor
        </Button>
        <Button size="small" onClick={onBuildClick}>
          {buildTitle}
        </Button>
        <Button size="small" onClick={() => onClear({location, uid})}>
          Reset
        </Button>
      </CardActions>
    </Card>
  );
}

function actionDispatch(dispatch, props) {
  return {
    onChange: payload => {
      dispatch(renameVertex(payload));
      dispatch(relinkAssociations(payload));
      dispatch(clearText(payload));
    },
    onChipDelete: payload => {
      dispatch(removeAssociation(payload));
      dispatch(clearText(payload));
    },
    onEditor: payload => dispatch(genCodeEdit('nodeEdit', payload)),
    onBuild: cancel => dispatch(build(cancel)),
    onClear: payload => {
      dispatch(removeAllAssociations(payload));
      dispatch(clearText(payload));
    },
  };
}

export default connect(
  state => ({
    operations: state.operations,
    location: state.context.location,
    library: state.library[state.context.location],
    corpus: state.corpus[state.context.location],
  }),
  actionDispatch,
)(PureCardVertex);
