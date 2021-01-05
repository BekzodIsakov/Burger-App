import React, { Component } from 'react';
import axios from '../../axios-instances';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from './Order/Order';

class Orders extends Component {
  state = {
    orders: null,
    loading: true,
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then((res) => {
        let fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ orders: fetchedOrders, loading: false });
      })
      .catch((err) => console.log(err));
  }

  render() {
    let orders = <Spinner />;

    if (this.state.orders) {
      orders = this.state.orders.map((order) => (
        <Order order={order} key={order.id} />
      ));
    }

    return <div>{orders}</div>;
  }
}

export default Orders;
