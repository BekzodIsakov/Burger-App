import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => (
        <li key={igKey}>
          <span style={{ textTransform: 'uppercase' }}>{igKey}</span>:{' '}
          {this.props.ingredients[igKey]}
        </li>
      )
    );
    return (
      <Aux>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong>
        <p>Continue to checkout?</p>
        <Button btnType='Danger' clicked={this.props.isPurchasingCancelHandler}>
          CANCEL
        </Button>
        <Button btnType='Success' clicked={this.props.purchaseContinueHandler}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

// function OrderSummary ({
//   ingredients,
//   purchaseContinueHandler,
//   isPurchasingCancelHandler,
//   totalPrice,
// }) {
//   const ingredientSummary = Object.keys(ingredients).map((igKey) => (
//     <li key={igKey}>
//       <span style={{ textTransform: 'uppercase' }}>{igKey}</span>:{' '}
//       {ingredients[igKey]}
//     </li>
//   ));

//   return (
//     <Aux>
//       <h3>Your order</h3>
//       <p>A delicious burger with the following ingredients:</p>
//       <ul>{ingredientSummary}</ul>
//       <strong>Total Price: {totalPrice.toFixed(2)}</strong>
//       <p>Continue to checkout?</p>
//       <Button btnType='Danger' clicked={isPurchasingCancelHandler}>
//         CANCEL
//       </Button>
//       <Button btnType='Success' clicked={purchaseContinueHandler}>
//         CONTINUE
//       </Button>
//     </Aux>
//   );
// };

export default OrderSummary;
