import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

const MIN_NAME_LENGTH = 3;

export default class Login extends React.Component {
  constructor() {
    super();
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
    this.state = {
      userName: '',
      isButtonDisabled: true,
      creatingUser: false,
    };
  }

  handleLoginButtonClick() {
    this.setState({ creatingUser: true });
    const { userName } = this.state;
    createUser({ name: userName }).then(() => {
      const { history } = this.props;
      history.push('/search');
    });
  }

  onChangeInput({ target: { name, value } }) {
    this.setState({
      [name]: value,
      isButtonDisabled: value.length < MIN_NAME_LENGTH,
    });
  }

  render() {
    const { userName, isButtonDisabled, creatingUser } = this.state;
    return (
      <div data-testid="page-login">
        {
          !creatingUser
            ? (
              <form>
                <input
                  name="userName"
                  data-testid="login-name-input"
                  type="text"
                  onChange={ this.onChangeInput }
                  value={ userName }
                />
                <button
                  data-testid="login-submit-button"
                  type="button"
                  onClick={ this.handleLoginButtonClick }
                  disabled={ isButtonDisabled }
                >
                  Entrar
                </button>
              </form>
            ) : (
              <Loading />
            )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
