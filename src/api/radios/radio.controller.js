import { Radio } from '../../models';
import axios from 'axios';
import helpers from '../../helpers';

const apiTypes = {
  azuracast: {
    song: 'now_playing.song.text',
    dj: 'live.streamer_name',
    listeners: 'listeners.total'
  }
};

export const fetchStats = async (id) => {
  const radio = await Radio.find({ id });
  if (!radio || !radio[0]) return new Error('Radio not found!');
  const { data } = await axios.get(radio[0].api.url)
  return getData(data, radio[0]);
};

export const getData = (data, radio) => {
  const info = apiTypes[radio.api.type] ?? radio.api.data ?? undefined;
  if (!data) return new Error('API type not provided');
  const result = {};
  for (let a in info) {
    const part = info[a];
    const obj = {};
    const parts = part.split('.');
    for (let i = 0; i < parts.length; i++) {
      if (i == 0) obj = data[parts[i]]
      else obj = obj[parts[i]];
    };
    result[a] = obj;
  };
  result.song = result.song || 'RoyaliTEA - Error';
  result.dj = result.dj || 'AutoDJ';
  result.listeners = result.listeners || 0;
  result.radio = radio
  return result;
};

export const returnRadio = async(req, res) => {
  let { id } = req.params;
  id = id.toLowerCase();
  if (!id) return res.status(400).json({
    status: 'error',
    error: {
      code: 400,
      message: 'Parameter "id" was required but not found.'
    }
  });
  try {
    const stats = await fetchStats(id)
    if (!stats) return res.status(404).json({
      status: 'error',
      error: {
        code: 404,
        message: 'Not found',
        full: `Station ID "${id}" could not be found`
      }
    })
    const song = await helpers.fetchSongDetails(stats.song)
    res.json({
      status: 'success',
      data: {
        station: {
          id: stats.radio.id,
          name: stats.radio.name,
          votes: stats.radio.votes,
          website: stats.radio.website,
          discord: stats.radio.discord,
          stream: stats.radio.stream,
          listeners: stats.listeners
        },
        dj: stats.dj,
        ...song
      }
    });
  } catch (e) {
    const full = e.toString();
    if (full == `TypeError: Cannot read property 'id' of undefined`) {
      res.status(404).json({
        status: 'error',
        error: {
          code: 404,
          message: 'Not found',
          full: `Station ID "${id}" could not be found`
        }
      })
    } else {
      res.status(500).json({
        status: 'error',
        error: {
          code: 500,
          message: 'Unknown error',
          full: 'An unknown error occurred. Check that the radio is online.'
        }
      })
    }    
  }
};

export const listRadios = async () => {
  const data = await Radio.find({}, { name: 1, id: 1, votes: 1, logo: 1, website: 1, _id: 0 })
  return data
}
