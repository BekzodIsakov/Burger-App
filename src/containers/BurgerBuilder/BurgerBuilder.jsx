import React, { Component } from 'react';
import { connect } from 'react-redux';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/Order/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary';
import Spinner from '../../components/UI/Spinner/Spinner';
import {
  addIngredient,
  removeIngredient,
  initIngredients,
} from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    isPurchasing: false,
    loading: false,
  };

  componentDidMount() {
    this.props.initIngredients();
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((total, el) => total + el, 0);

    return sum > 0;
  };

  isPurchasingHandler = () => {
    this.setState({ isPurchasing: true });
  };

  isPurchasingCancelHandler = () => {
    this.setState({ isPurchasing: false });
  };

  purchaseContinueHandler = () => {
    // const queryParams = [];
    // for (let i in this.props.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       '=' +
    //       encodeURIComponent(this.props.ingredients[i])
    //   );
    // }
    // queryParams.push('totalPrice=' + this.props.totalPrice.toFixed(2));

    // const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      // search: queryString,
    });
  };

  render() {
    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Could not load ingredients</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredientHandler={this.props.addIngredient}
            removeIngredientHandler={this.props.removeIngredient}
            ingredients={this.props.ingredients}
            price={this.props.totalPrice}
            isPurchasable={this.updatePurchaseState(this.props.ingredients)}
            order={this.isPurchasingHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseContinueHandler={this.purchaseContinueHandler}
          isPurchasingCancelHandler={this.isPurchasingCancelHandler}
          totalPrice={this.props.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.isPurchasing}
          modalClosed={this.isPurchasingCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingredient) => dispatch(addIngredient(ingredient)),
    removeIngredient: (ingredient) => dispatch(removeIngredient(ingredient)),
    initIngredients: () => dispatch(initIngredients()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
