import axios from 'axios';

const defaultSong = { 
  song: {
    name: 'Broken Metadata',
    album: '',
    art: ''
  },
  artist: {
    name: 'RoyaliTEA',
    art: ''
  }
}

const formatSongDetails = ([songDetails]) => ({
    song: {
      id: songDetails.id,
      name: songDetails.title,
      preview: songDetails.preview
    },
    album: {
      id: songDetails.album.id,
      name: songDetails.album.title,
      art: songDetails.album.cover_big
    },
    artist: {
      id: songDetails.artist.id,
      name: songDetails.artist.name,
      art: songDetails.artist.picture_big
    }
  });
  
  const fetchSongDetails = async (songName) =>
    axios.get(`https://api.deezer.com/search?q=${encodeURIComponent(songName)}&limit=1`)
      .then(({ data }) => data.data)
      .then(formatSongDetails)
      .catch(error => {
        console.error(error);
  
        return defaultSong;
      });

export default { fetchSongDetails }