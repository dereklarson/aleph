// @format
import React from 'react';
import {connect} from 'react-redux';
import {Container, Grid} from '@material-ui/core';
import Depot from './depot/Depot';
import Diagram from './diagram/Diagram';
import Ticker from './depot/Ticker';
import {useStyles} from './style/styling';
import {Credits} from './comcom/Accessories';

export function Workspace() {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Credits />
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Ticker />
            <Depot />
          </Grid>
          <Grid item xs={10}>
            <Diagram />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}

export default Workspace;
