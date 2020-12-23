import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/Order/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0,
    },
    totalPrice: 4,
    isPurchasing: false,
    isPurchasable: false,
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((total, el) => total + el, 0);

    this.setState({ isPurchasable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount !== 0) {
      let newCount = oldCount - 1;

      const price = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - price;

      const updatedIngredients = {
        ...this.state.ingredients,
      };
      updatedIngredients[type] = newCount;
      this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
      this.updatePurchaseState(updatedIngredients);
    }
  };

  isPurchasingHandler = () => {
    this.setState({ isPurchasing: true });
  };

  isPurchasingCancelHandler = () => {
    this.setState({ isPurchasing: false });
  };

  purchaseContinueHandler = () => {
    alert('You continue!');
  };

  render() {
    return (
      <Aux>
        <Modal
          show={this.state.isPurchasing}
          modalClosed={this.isPurchasingCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseContinueHandler={this.purchaseContinueHandler}
            isPurchasingCancelHandler={this.isPurchasingCancelHandler}
            totalPrice={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredientHandler={this.addIngredientHandler}
          removeIngredientHandler={this.removeIngredientHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          isPurchasable={this.state.isPurchasable}
          order={this.isPurchasingHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
