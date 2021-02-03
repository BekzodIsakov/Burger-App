import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-instances';
import Input from '../../../components/UI/Input/Input';
import { purchaseBurgerStart } from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        isClicked: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        isClicked: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        isValid: false,
        isClicked: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        isClicked: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail',
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        isClicked: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        validation: {},
        isValid: true,
      },
    },
    loading: false,
    isBtnDisabled: true,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId,
    };

    // axios
    //   .post('/orders.json', order)
    //   .then((res) => {
    //     this.setState({ loading: false });
    //     this.props.history.push('/');
    //   })
    //   .catch(() => this.setState({ loading: false }));
    this.props.purchaseBurgerStart(order, this.props.token);
  };

  validate(value, validation) {
    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.minLength) {
      isValid = validation.minLength <= value.length && isValid;
    }

    if (validation.maxLength) {
      isValid = value.length <= validation.maxLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };

    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };

    // updatedFormElement = {
    //   elementType: 'input',
    //   elementConfig: {
    //     type: 'text',
    //     placeholder: 'Your Name',
    //   },
    //   validation: {
    //     required: true,
    //   },
    //   value: '',
    //   isValid: false,
    //   isClicked: false

    updatedFormElement.value = event.target.value;
    updatedFormElement.isValid = this.validate(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.isClicked = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let isValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      isValid = updatedOrderForm[inputIdentifier].isValid && isValid;
    }
    console.log(isValid);

    this.setState({ orderForm: updatedOrderForm, isBtnDisabled: !isValid });
  };

  render() {
    let formElementsArray = [];
    for (let orderFormElement in this.state.orderForm) {
      formElementsArray.push({
        id: orderFormElement,
        config: this.state.orderForm[orderFormElement],
      });
    }

    // config = {
    //   elementType: 'input',
    //     elementConfig: {
    //       type: 'text',
    //       placeholder: 'Your Name',
    //     },
    //     value: '',
    //     validation: {
    //       required: true,
    //     },
    //     isValid: false,
    //     isClicked: false,
    // }

    let form = (
      <form>
        {formElementsArray.map((formElem) => (
          <Input
            key={formElem.id}
            inputType={formElem.config.elementType}
            elementConfig={formElem.config.elementConfig}
            value={formElem.config.value}
            isValid={formElem.config.isValid}
            shouldValidate={formElem.config.validation}
            isClicked={formElem.config.isClicked}
            onChangeHandler={(event) =>
              this.onChangeHandler(event, formElem.id)
            }
          />
        ))}
        <Button
          btnType='Success'
          clicked={this.orderHandler}
          isDisabled={this.state.isBtnDisabled}
        >
          Order
        </Button>
      </form>
    );

    if (this.props.loading) {
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    isLoading: state.orderReducer.isLoading,
    token: state.authReducer.idToken,
    userId: state.authReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    purchaseBurgerStart: (order, token) =>
      dispatch(purchaseBurgerStart(order, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
