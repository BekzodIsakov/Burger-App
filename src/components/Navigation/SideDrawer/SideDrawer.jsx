import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';

const SideDrawer = ({ isSideDrawerOpen, closeSideDrawer }) => {
  let attachedClasses = [classes.SideDrawer, classes.Closed];
  if (isSideDrawerOpen) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={isSideDrawerOpen} clicked={closeSideDrawer} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
