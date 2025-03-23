import { Schema, model } from 'mongoose';

const UrlSchema = new Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  exipiry_date: {type: String },
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 }
});

export default model('Url', UrlSchema);
