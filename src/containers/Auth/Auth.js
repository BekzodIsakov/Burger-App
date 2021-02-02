import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { authenticate } from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';

class Auth extends Component {
  state = {
    orderForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        isValid: false,
        isClicked: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        isValid: false,
        isClicked: false,
      },
    },
    isBtnDisabled: true,
    isSignUp: true,
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

    if (validation.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (validation.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, elemIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
      [elemIdentifier]: {
        ...this.state.orderForm[elemIdentifier],
        value: event.target.value,
        isValid: this.validate(
          event.target.value,
          this.state.orderForm[elemIdentifier].validation
        ),
        isClicked: true,
      },
    };
    this.setState({ orderForm: updatedOrderForm });
  };

  submitHandler = (e) => {
    e.preventDefault();

    this.props.onAuthenticate(
      this.state.orderForm.email.value,
      this.state.orderForm.password.value,
      this.state.isSignUp
    );
  };

  switchAuthMode = () => {
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    // elementConfig = {
    //   elementType: 'input',
    //   elementConfig: {
    //     type: 'email',
    //     placeholder: 'Email Address',
    //   },
    //   value: '',
    //   validation: {
    //     required: true,
    //     isEmail: true,
    //   },
    //   isValid: false,
    //   isClicked: false,
    // };

    const formInputs = formElementsArray.map((formElem) => (
      <Input
        key={formElem.id}
        inputType={formElem.config.elementType}
        elementConfig={formElem.config.elementConfig}
        value={formElem.config.value}
        isValid={formElem.config.isValid}
        shouldValidate={formElem.config.validation}
        isClicked={formElem.config.isClicked}
        onChangeHandler={(event) => this.onChangeHandler(event, formElem.id)}
      />
    ));

    return (
      <div className={classes.AuthForm}>
        {this.props.isAuthenticated ? (
          this.props.isBuilding ? (
            <Redirect to='/checkout' />
          ) : (
            <Redirect to='/' />
          )
        ) : null}
        {/* {this.props.isAuthenticated && } */}
        {this.props.error && <p>{this.props.error.message}</p>}
        <form onSubmit={this.submitHandler}>
          {this.props.isLoading ? <Spinner /> : formInputs}
          <Button btnType='Success'>Submit</Button>
        </form>
        <Button btnType='Danger' clicked={this.switchAuthMode}>
          Switch to {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.authReducer.isLoading,
    error: state.authReducer.error,
    isAuthenticated: state.authReducer.idToken,
    isBuilding: state.burgerBuilder.isBuilding,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticate: (email, password, isSignup) =>
      dispatch(authenticate(email, password, isSignup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
