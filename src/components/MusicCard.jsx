import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  state = {
    isFavorite: false,
    togglingFavorite: false,
  }

  async componentDidMount() {
    const { trackId } = this.props;

    const favSongs = await getFavoriteSongs();

    const thisSongIsFavorite = favSongs.some(({
      trackId: currentTrackId,
    }) => trackId === currentTrackId);

    if (thisSongIsFavorite) this.setState({ isFavorite: true });
  }

  handleFavorite = (song) => {
    const { isFavorite } = this.state;
    this.setState({ togglingFavorite: true });
    if (isFavorite) {
      this.setState({ isFavorite: false }, async () => {
        await removeSong(song);
        this.setState({ togglingFavorite: false });
      });
      return;
    }
    this.setState({ isFavorite: true }, async () => {
      await addSong(song);
      this.setState({ togglingFavorite: false });
    });
  }

  render() {
    const { trackName, previewUrl, musicInfo, trackId } = this.props;
    const { isFavorite, togglingFavorite } = this.state;

    return !togglingFavorite ? (
      <li>
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            id={ `checkbox-music-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
            name="fav"
            type="checkbox"
            checked={ isFavorite }
            onChange={ () => this.handleFavorite(musicInfo) }
          />
        </label>
      </li>
    ) : <Loading />;
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musicInfo: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};
