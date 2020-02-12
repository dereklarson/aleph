// @format
import React from 'react';
import {connect} from 'react-redux';
import {Container, Grid} from '@material-ui/core';
import Depot from '@depot/Depot';
import DataDepot from '@depot/DataDepot';
import Ticker from '@depot/Ticker';
import Diagram from '@diagram/Diagram';
import {Credits} from '@common/Accessories';
import {useStyles} from '@style/styling';

export function PureWorkspace({location}) {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Ticker />
            <DataDepot />
            <Depot />
          </Grid>
          <Grid item xs={10}>
            <Diagram />
            <Credits />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}

export default connect(state => ({
  location: state.context.location,
}))(PureWorkspace);
