import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
  let inputElement = null;
  let classesArray = [classes.Input];

  if (props.isValid === false && props.shouldValidate && props.isClicked) {
    classesArray.push(classes.Invalid);
  }

  switch (props.inputType) {
    case 'input':
      inputElement = (
        <input
          className={classesArray.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChangeHandler}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={classesArray.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChangeHandler}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={classesArray.join(' ')}
          value={props.value}
          onChange={props.onChangeHandler}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classesArray.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChangeHandler}
        />
      );
  }

  return inputElement;
};

export default Input;
