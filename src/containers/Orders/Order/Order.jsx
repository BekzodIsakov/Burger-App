import React from 'react';
import classes from './Order.module.css';

const Order = ({ order }) => {
  const ingredients = [];

  for (let ingredientName in order.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: order.ingredients[ingredientName],
    });
  }

  const ingredientOutput = ingredients.map((ing) => {
    return (
      <span key={ing.name} className={classes.Ingredient}>
        {ing.name}: ({ing.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>{order.totalPrice.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
