// @format
import React from 'react';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Chip, TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {propsToStyle} from '@utils/helpers';
import {removeSection, renameVertex, setText, clearText} from '@data/reducers';
import {createText} from '@utils/helpers';

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
  let chipDisplay = [];
  for (const [index, section] of sections.entries()) {
    const chipDelete = () => onChipDelete({location, uid, section});
    chipDisplay.push(
      <Chip key={index} label={section} onDelete={chipDelete} />,
    );
  }

  const [texterr, setErr] = React.useState(false);
  const edittext = createText({library, sections, corpus, uid});
  const editfunc = text => setText({location, uid: uid, text: text});

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
          {chipDisplay}
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
