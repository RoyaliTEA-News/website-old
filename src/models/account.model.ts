import { Schema, model, Document } from 'mongoose'

interface Accounts {
    twitter?: String,
    instagram?: String,
    facebook?: String,
    spotify?: String,
    youtube?: String
}

const schema = new Schema({
    id: String,
    bio: String,
    accounts: Object,
    roles: Array
});

export const Accounts = model('Accounts', schema);