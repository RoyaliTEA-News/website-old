import { Schema, model, Document } from 'mongoose'

type radioType = 'azuracast' | 'shoutcast' | 'icecast' | 'custom';

interface apiData {
  song: String;
  dj: String;
  listeners?: Number;
}

interface radioAPI {
  type: radioType;
  url: String;
  data?: apiData;
}

export interface RadioModel extends Document {
  name: String,
  id: String,
  website: String,
  api: radioAPI,
  stream: String,
  discord: String
}

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    default: 'https://i.imgur.com/qkTfuFU.png',
    required: true
  },
  website: {
    type: String,
    required: true
  },
  api: {
    type: Object,
    required: true
  },
  votes: {
    type: Number,
    default: 0,
    required: true
  },
  comments: {
    type: Array,
    required: true
  },
  stream: {
    type: String,
    required: true
  },
  discord: {
    type: String,
    required: false
  }
});

export const Radio = model<RadioModel>('Radio', schema);