// @format
import React from 'react';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Chip, TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {propsToStyle} from 'utils/helpers';

export function PureCardVertex({
  onChange,
  onChipDelete,
  name,
  cardActions,
  sections,
  id,
  state,
  styleProps,
}) {
  let chipDisplay = [];
  for (const section of sections.values()) {
    const chipDelete = () => onChipDelete(id, section);
    chipDisplay.push(<Chip label={section} onDelete={chipDelete} />);
  }
  return (
    <Card style={propsToStyle(styleProps)}>
      <CardActionArea>
        <CardContent>
          <TextField
            label="Node name"
            defaultValue={name}
            margin="normal"
            onChange={event => onChange(id, event.target.value)}
          />
          {chipDisplay}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" onClick={() => cardActions.onEditor()}>
          Editor
        </Button>
        <Button size="small" onClick={() => cardActions.onBuild(state)}>
          Build
        </Button>
        <Button size="small" onClick={() => cardActions.onClear(id)}>
          Reset
        </Button>
      </CardActions>
    </Card>
  );
}

export const removeSection = (id, sectionValue) => ({
  type: 'REMOVE_SECTION',
  vertex: id,
  section: sectionValue,
});

export const changeVertexName = (id, name) => ({
  type: 'CHANGE_VERTEX_NAME',
  id: id,
  name: name,
});

function actionDispatch(dispatch) {
  return {
    onChange: (id, name) => dispatch(changeVertexName(id, name)),
    onChipDelete: (id, sectionValue) =>
      dispatch(removeSection(id, sectionValue)),
  };
}

export default connect(null, actionDispatch)(PureCardVertex);
