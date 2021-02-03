import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import Order from './Order/Order';
import { fetchOrders } from '../../store/actions/index';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;

    if (!this.props.isLoading) {
      orders = this.props.orders.map((order) => (
        <Order order={order} key={order.id} />
      ));
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.orders,
    isLoading: state.orderReducer.isLoading,
    token: state.authReducer.idToken,
    userId: state.authReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
