import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ({ ingredients }) => {
  let transformedIngredients = Object.keys(ingredients)
    .map((key) =>
      [...Array(ingredients[key])].map((_, index) => (
        <BurgerIngredient key={key + index} type={key} />
      ))
    )
    .reduce((arr, el) => arr.concat(el), []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default Burger;
