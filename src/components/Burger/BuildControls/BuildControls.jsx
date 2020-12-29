import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
  { label: 'Bacon', type: 'bacon' },
];

const BuildControls = ({
  ingredients,
  price,
  isPurchasable,
  addIngredientHandler,
  removeIngredientHandler,
  order,
}) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>${price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          addIngredientHandler={() => addIngredientHandler(ctrl.type)}
          removeIngredientHandler={() => removeIngredientHandler(ctrl.type)}
          isDisabled={ingredients[ctrl.type] === 0 ? true : false}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!isPurchasable}
        onClick={order}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
