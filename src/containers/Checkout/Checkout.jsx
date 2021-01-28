import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { purchaseInit } from '../../store/actions/index';

class Checkout extends Component {
  componentWillUnmount() {
    this.props.purchaseInit();
  }

  checkoutCancelled = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to='/' />;
    if (this.props.ingredients) {
      summary = (
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelled}
          checkoutContinued={this.checkoutContinued}
          ingredients={this.props.ingredients}
        />
      );
    }

    const purchasedRedirect = this.props.isPurchased ? (
      <Redirect to='/' />
    ) : null;

    return (
      <div>
        {summary}
        <Route
          path={this.props.match.url + '/contact-data'}
          component={ContactData}
        />
        {purchasedRedirect}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    isPurchased: state.orderReducer.isPurchased,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    purchaseInit: () => dispatch(purchaseInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
