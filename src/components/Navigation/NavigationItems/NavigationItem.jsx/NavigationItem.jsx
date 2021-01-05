import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = ({ children, link, exact }) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink to={link} exact={exact} activeClassName={classes.active}>
        {children}
      </NavLink>
    </li>

    // creating Navlink with active props without NavLink from 'react-router-dom'
    // <li className={classes.NavigationItem}>
    //   <a href={link} className={isActive ? classes.active : null}>
    //     {children}
    //   </a>
    // </li>
  );
};

export default NavigationItem;
