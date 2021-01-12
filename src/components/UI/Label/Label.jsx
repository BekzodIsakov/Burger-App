import React from 'react';
import classes from './Label.module.css';

const Label = (props) => {
  return (
    <label className={classes.Label} {...props}>
      {props.children}
    </label>
  );
};

export default Label;
