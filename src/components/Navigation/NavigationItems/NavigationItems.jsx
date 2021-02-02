import React from 'react';
import NavigationItem from './NavigationItem.jsx/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' exact>
        Burger Builder
      </NavigationItem>
      {/* <NavigationItem link='/checkout'>Checkout</NavigationItem> */}
      <NavigationItem link='/orders'>Orders</NavigationItem>
      <NavigationItem link='/auth'>Authentication</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
