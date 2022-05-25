import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MIN_SEARCH_LENGTH = 2;

export default class Search extends React.Component {
  constructor() {
    super();
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      searchInput: '',
      artistName: '',
      isButtonDisabled: true,
      searching: false,
      albumList: [],
    };
  }

  onChangeInput({ target: { name, value } }) {
    this.setState({
      [name]: value,
      isButtonDisabled: value.length < MIN_SEARCH_LENGTH,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState(({ searchInput }) => ({
      searching: true,
      artistName: searchInput,
      searchInput: '',
      isButtonDisabled: true,
    }), async () => {
      const { artistName } = this.state;
      const albums = await searchAlbumsAPI(artistName);
      this.setState({ albumList: albums, searching: false });
    });
  }

  render() {
    const {
      searchInput,
      isButtonDisabled,
      searching,
      albumList,
      artistName,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {
          searching ? (
            <Loading />
          ) : (
            <form onSubmit={ this.onSubmit }>
              <input
                data-testid="search-artist-input"
                name="searchInput"
                type="text"
                onChange={ this.onChangeInput }
                value={ searchInput }
              />
              <button
                data-testid="search-artist-button"
                type="submit"
                disabled={ isButtonDisabled }
              >
                Procurar
              </button>
            </form>
          )
        }
        {
          albumList.length !== 0 ? (
            <p>
              Resultado de álbuns de:
              {` ${artistName}`}
            </p>
          ) : <p>Nenhum álbum foi encontrado</p>
        }
        {
          albumList.length !== 0 && (
            <ul>
              {
                albumList.map(({
                  collectionId,
                  collectionName,
                  artworkUrl100,
                }) => (
                  <li
                    key={ collectionId }
                  >
                    <img src={ artworkUrl100 } alt={ collectionName } />
                    <Link
                      data-testid={ `link-to-album-${collectionId}` }
                      to={ `/album/${collectionId}` }
                    >
                      {collectionName}
                    </Link>
                  </li>
                ))
              }
            </ul>
          )
        }
      </div>
    );
  }
}
