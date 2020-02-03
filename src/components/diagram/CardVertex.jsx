// @format
import React from 'react';
import {connect} from 'react-redux';
import {Button, Card, Chip, Paper, TextField} from '@material-ui/core';
import {CardActionArea, CardActions, CardContent} from '@material-ui/core';
import _ from 'lodash';
import {removeSection, renameVertex, setText, clearText} from '@data/reducers';
import {createText, titlize, propsToStyle} from '@utils/helpers';
import {useStyles} from '@style/styling';

export function PureCardVertex({
  location,
  library,
  corpus,
  onChange,
  onChipDelete,
  uid,
  idlist,
  cardActions,
  sections,
  styleProps,
}) {
  const classes = useStyles();
  const [texterr, setErr] = React.useState(false);

  let chipDisplay = [];
  let libError = false;
  for (const [index, section] of sections.entries()) {
    let libraryMissing = !_.has(library, section);
    libError = libError || libraryMissing;
    const chipDelete = () => onChipDelete({location, uid, section});
    chipDisplay.push(
      <Chip
        key={index}
        label={titlize(section)}
        color={libraryMissing ? 'secondary' : 'default'}
        onDelete={chipDelete}
      />,
    );
  }

  let edittext = '';
  let editfunc = () => 0;
  if (!libError) {
    edittext = createText({library, sections, corpus, uid});
    editfunc = text => setText({location, uid: uid, text: text});
  }

  return (
    <Card
      style={propsToStyle(styleProps)}
      onClick={event => event.stopPropagation()}>
      <CardActionArea>
        <CardContent>
          <TextField
            label="Node name"
            defaultValue={uid}
            error={texterr}
            helperText={texterr ? 'Already in use' : '<Enter> to set'}
            margin="normal"
            onKeyPress={event => {
              if (!texterr && event.key === 'Enter') {
                onChange({location, uid, newId: event.target.value});
              }
            }}
            onChange={event => {
              setErr(idlist.includes(event.target.value));
            }}
          />
          <Paper className={classes.paper}>{chipDisplay}</Paper>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          onClick={() => cardActions.onEditor({edittext, editfunc})}>
          Editor
        </Button>
        <Button size="small" onClick={() => cardActions.onBuild()}>
          Build
        </Button>
        <Button
          size="small"
          onClick={() => cardActions.onClear({location, uid})}>
          Reset
        </Button>
      </CardActions>
    </Card>
  );
}

function actionDispatch(dispatch) {
  return {
    onChange: payload => {
      dispatch(renameVertex(payload));
      dispatch(clearText(payload));
    },
    onChipDelete: payload => {
      dispatch(removeSection(payload));
      dispatch(clearText(payload));
    },
  };
}

export default connect(
  state => ({
    location: state.context.location,
    library: state.library[state.context.location],
    corpus: state.corpus[state.context.location],
  }),
  actionDispatch,
)(PureCardVertex);
