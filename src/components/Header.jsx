import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    getUser().then((user) => { this.setState(user); });
  }

  render() {
    const { name } = this.state;
    return (
      <header data-testid="header-component">
        {
          name ? <p data-testid="header-user-name">{name}</p> : <Loading />
        }
      </header>
    );
  }
}
