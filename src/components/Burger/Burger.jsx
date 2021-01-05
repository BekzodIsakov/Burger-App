import React from 'react';
import classes from './Burger.module.css';
import { withRouter } from 'react-router-dom';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((key) =>
      [...Array(props.ingredients[key])].map((_, index) => (
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

export default withRouter(Burger); //in this component we need {match, history} props provided by react-router. But since this is not a direct component used by Route withRouter can be used to obtain those props
