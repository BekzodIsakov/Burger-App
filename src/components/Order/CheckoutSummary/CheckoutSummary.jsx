import React from 'react';
import classes from './CheckoutSummary.module.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => (
  <div className={classes.CheckoutSummary}>
    <h1>We hope it tastes good!</h1>
    <div style={{ width: '100%' }}>
      <Burger ingredients={props.ingredients} />
      <Button clicked={props.checkoutCancelled} btnType='Danger'>
        CANCEL
      </Button>
      <Button clicked={props.checkoutContinued} btnType='Success'>
        CONTINUE
      </Button>
    </div>
  </div>
);

export default CheckoutSummary;
