import { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { Book } from "../models/book.model";
import { ExchangeRequest } from "../models/exchange.model";

export const createExchangeRequest = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { offeredBookId, requestedBookId } = req.body;
  try {
    const offeredBook = await Book.findById(offeredBookId);
    const requestedBook = await Book.findById(requestedBookId);

    if (!offeredBook || !requestedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (requestedBook.owner.toString() === req.user?._id) {
      return res
        .status(400)
        .json({ message: "You cannot exchange your own book" });
    }

    const exchangeRequest = new ExchangeRequest({
      offeredBook: offeredBookId,
      requestedBook: requestedBookId,
      requester: req.user?._id,
      requestee: requestedBook.owner,
      status: "pending",
    });

    await exchangeRequest.save();

    res.status(201).json(exchangeRequest);
  } catch (error) {
    next(error);
  }
};

export const getExchangeRequests = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const exchangeRequests = await ExchangeRequest.find({
      $or: [{ requester: req.user?._id }, { requestee: req.user?._id }],
    })
      .populate("offeredBook requestedBook")
      .populate("requester", "name email")
      .populate("requestee", "name email");

    res.json(exchangeRequests);
  } catch (error) {
    next(error);
  }
};

export const getExchangeRequestById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const exchangeRequest = await ExchangeRequest.findById(req.params.id)
      .populate("offeredBook requestedBook")
      .populate("requester", "name email")
      .populate("requestee", "name email");

    if (!exchangeRequest) {
      return res.status(404).json({ message: "Exchange request not found" });
    }

    if (
      exchangeRequest.requester.toString() !== req.user?._id &&
      exchangeRequest.requestee.toString() !== req.user?._id
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(exchangeRequest);
  } catch (error) {
    next(error);
  }
};

export const updateExchangeRequest = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { status } = req.body;
  try {
    const exchangeRequest = await ExchangeRequest.findById(req.params.id);

    if (!exchangeRequest) {
      return res.status(404).json({ message: "Exchange request not found" });
    }

    if (exchangeRequest.requestee.toString() !== req.user?._id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (status !== "accepted" && status !== "rejected") {
      return res.status(400).json({ message: "Invalid status" });
    }

    exchangeRequest.status = status;
    await exchangeRequest.save();

    res.json(exchangeRequest);
  } catch (error) {
    next(error);
  }
};
