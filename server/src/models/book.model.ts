import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  _id: string;
  title: string;
  description: string;
  picture: string;
  author: string;
  genre: string;
  owner: mongoose.Types.ObjectId;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

export const Book = mongoose.model<IBook>("Book", BookSchema);
