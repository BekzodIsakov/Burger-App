import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import axios from '../../../axios-instances';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer: {
        name: 'Behzod Isakov',
        email: 'myemail@mail.test',
        address: {
          street: 'Valley st, no.117',
          city: 'Ball',
          country: 'Valleyball',
        },
      },
    };
    axios
      .post('/orders.json', order)
      .then(() => {
        this.setState({ loading: false }), this.props.history.push('/');
      })
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    let form = (
      <form>
        <input type='text' name='name' placeholder='Your Name' />
        <input type='mail' name='mail' placeholder='Your Mail' />
        <input type='text' name='street' placeholder='Street' />
        <input type='text' name='postal code' placeholder='Postal Code' />
        <Button btnType='Success' clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
