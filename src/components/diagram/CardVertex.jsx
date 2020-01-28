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

export function PureCardVertex({
  location,
  onChange,
  onChipDelete,
  name,
  cardActions,
  sections,
  id,
  styleProps,
}) {
  let chipDisplay = [];
  for (const [index, section] of sections.entries()) {
    const chipDelete = () => onChipDelete(location, id, section);
    chipDisplay.push(
      <Chip key={index} label={section} onDelete={chipDelete} />,
    );
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
        {/* <Button size="small" onClick={() => cardActions.onBuild(state)}> */}
        {/*   Build */}
        {/* </Button> */}
        <Button size="small" onClick={() => cardActions.onClear(id)}>
          Reset
        </Button>
      </CardActions>
    </Card>
  );
}

export const removeSection = (location, id, sectionValue) => ({
  type: 'REMOVE_SECTION',
  location: location,
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
    onChipDelete: (location, id, sectionValue) =>
      dispatch(removeSection(location, id, sectionValue)),
  };
}

export default connect(
  state => ({
    location: state.context.location,
  }),
  actionDispatch,
)(PureCardVertex);
