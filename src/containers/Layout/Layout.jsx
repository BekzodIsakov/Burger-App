import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

class Layout extends Component {
  state = {
    isSideDrawerOpen: false,
  };

  openSideDrawer = () => {
    this.setState({ isSideDrawerOpen: true });
  };

  closeSideDrawer = () => {
    this.setState({ isSideDrawerOpen: false });
  };

  render() {
    return (
      <Aux>
        <Toolbar openSideDrawer={this.openSideDrawer} />
        <SideDrawer
          isSideDrawerOpen={this.state.isSideDrawerOpen}
          closeSideDrawer={this.closeSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
