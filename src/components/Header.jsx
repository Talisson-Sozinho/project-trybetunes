import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
      </header>
    );
  }
}
