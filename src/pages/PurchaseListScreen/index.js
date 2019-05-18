import React, { Component } from 'react';
import AppTopBar from '../../components/AppTopBar'
import DrawerMenu from '../../components/Drawer'
import { withStyles } from '@material-ui/core/styles';
import { Styles } from "./styles";
import classNames from 'classnames';

class PurchaseListScreen extends Component {

  render() {
    const {
      classes
    } = this.props;

    return (
      <div className={classes.root}>
        <AppTopBar />
        <DrawerMenu />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div>uafahfaefoijafjioai</div>
        </main>
      </div>

    );
  }
}

export default withStyles(Styles, { withTheme: true })(PurchaseListScreen);
