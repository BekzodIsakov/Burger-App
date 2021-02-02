import React from 'react';
import NavigationItem from './NavigationItem.jsx/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' exact>
        Burger Builder
      </NavigationItem>
      {/* <NavigationItem link='/checkout'>Checkout</NavigationItem> */}
      {props.isAuthenticated && (
        <NavigationItem link='/orders'>Orders</NavigationItem>
      )}
      {props.isAuthenticated ? (
        <NavigationItem link='/logout'>Logout</NavigationItem>
      ) : (
        <NavigationItem link='/auth'>Authentication</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
