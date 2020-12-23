import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.module.css';

const Toolbar = ({ openSideDrawer }) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle openSideDrawer={openSideDrawer} />
      <Logo height='80%' />
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
