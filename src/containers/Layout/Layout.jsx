import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          openSideDrawer={this.openSideDrawer}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          isSideDrawerOpen={this.state.isSideDrawerOpen}
          closeSideDrawer={this.closeSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.idToken,
  };
};

export default connect(mapStateToProps)(Layout);
