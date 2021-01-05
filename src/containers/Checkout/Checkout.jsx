import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = null;

    for (let param of query.entries()) {
      if (param[0] !== 'totalPrice') {
        ingredients[param[0]] = +param[1];
      } else {
        totalPrice = param[1];
      }

      //what query.entries() technically returns
      // {
      //   ['bacon', '0'],
      //   ['cheese', '1'],
      //   ['meat', '1'],
      //   ['salad', '1'],
      // }
    }

    this.setState({ ingredients: ingredients, totalPrice: totalPrice });

    // from tutorial
    //   const query = new URLSearchParams(this.props.location.search);
    //   const ingredients = {};
    //   for (let param of query.entries()) {
    //     // ['salad', '1']
    //     ingredients[param[0]] = +param[1];
    //   }
    //   this.setState({ ingredients: ingredients });
  }

  checkoutCancelled = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelled}
          checkoutContinued={this.checkoutContinued}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.url + '/contact-data'}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
