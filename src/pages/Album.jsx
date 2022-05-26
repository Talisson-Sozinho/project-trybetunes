import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends React.Component {
  state = {
    musics: [],
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((response) => {
      this.setState({ musics: response });
    });
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <ul>
          {
            musics ? musics.map(({
              trackName,
              artistName,
              collectionName,
              trackId,
              previewUrl }, index) => {
              if (index === 0) {
                return (
                  <header key={ artistName }>
                    <h1 data-testid="album-name">{collectionName}</h1>
                    <h2 data-testid="artist-name">{artistName}</h2>
                  </header>
                );
              }
              return (<MusicCard
                key={ trackId }
                trackName={ trackName }
                previewUrl={ previewUrl }
              />);
            }) : <Loading />
          }
        </ul>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
