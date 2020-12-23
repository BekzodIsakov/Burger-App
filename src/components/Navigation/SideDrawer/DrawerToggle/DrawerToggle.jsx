import React from 'react';
import classes from './DrawerToggle.module.css';

const DrawerToggle = ({ openSideDrawer }) => {
  return (
    <div onClick={openSideDrawer} className={classes.DrawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DrawerToggle;
