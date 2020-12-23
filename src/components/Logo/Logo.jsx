import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';
import PropTypes from 'prop-types';

const Logo = (props) => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt='burgerLogo' />
  </div>
);

Logo.propTypes = {
  height: PropTypes.string,
};

export default Logo;
