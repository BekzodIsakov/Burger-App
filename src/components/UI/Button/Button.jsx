import React from 'react';
import classes from './Button.module.css';

const Button = ({ children, clicked, btnType, isDisabled }) => (
  <button
    className={[classes.Button, classes[btnType]].join(' ')}
    onClick={clicked}
    disabled={isDisabled}
  >
    {children}
  </button>
);

export default Button;
