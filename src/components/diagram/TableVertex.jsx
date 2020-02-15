// @format
import React from 'react';
import {Table, TableBody, TableCell, Typography} from '@material-ui/core';
import {Paper, TableContainer, TableRow} from '@material-ui/core';
import {titlize} from '@utils/helpers';
import {useStyles} from '@style/styling';

export default function TableVertex({uid, associations, styleProps}) {
  const nodelabel = titlize(uid);
  const classes = useStyles();

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Paper className={classes.paper}>
        <Typography
          key="title"
          variant="h6"
          component="h2"
          style={{alignSelf: 'center'}}>
          {nodelabel}
        </Typography>
      </Paper>
      <Table size="small" aria-label="customized table">
        <TableBody>
          {associations.map(row => (
            <TableRow hover key={row.field}>
              <TableCell component="th" scope="row">
                {row.field}
              </TableCell>
              <TableCell align="right">{row.datatype}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
