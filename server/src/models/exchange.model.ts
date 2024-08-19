import mongoose, { Document, Schema } from "mongoose";

export interface IExchangeRequest extends Document {
  _id: string;
  offeredBook: Schema.Types.ObjectId;
  requestedBook: Schema.Types.ObjectId;
  requester: Schema.Types.ObjectId;
  requestee: Schema.Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
}

const exchangeRequestSchema = new Schema<IExchangeRequest>({
  offeredBook: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  requestedBook: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  requester: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  requestee: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

export const ExchangeRequest = mongoose.model<IExchangeRequest>(
  "ExchangeRequest",
  exchangeRequestSchema
);
