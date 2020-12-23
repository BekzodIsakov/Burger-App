import React from 'react';
import classes from './NavigationItem.module.css';

const NavigationItem = ({ children, link, isActive }) => {
  return (
    <li className={classes.NavigationItem}>
      <a href={link} className={isActive ? classes.active : null}>
        {children}
      </a>
    </li>
  );
};

export default NavigationItem;
