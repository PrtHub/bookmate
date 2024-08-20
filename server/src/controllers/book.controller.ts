import mongoose from "mongoose";
import { AuthRequest } from "../middleware/auth";
import { Book } from "../models/book.model";
import { User } from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { deleteImage } from "../config/cloudinary";

export const addBook = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, description, author, genre } = req.body;
  const picture = req.file?.path;

  if (!title || !description || !author || !genre || !picture) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findById(req.user?._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const book = new Book({
      title,
      description,
      picture: picture,
      author,
      genre,
      owner: req.user?._id,
    });

    await book.save();
    user.books.push(new mongoose.Types.ObjectId(book._id));
    await user.save();

    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await Book.find().populate("owner", "name email");
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "owner",
      "name email"
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, description, author, genre } = req.body;
  const picture = req.file?.path;

  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.owner.toString() !== req.user?._id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const updateData: any = {
      title,
      description,
      author,
      genre,
    };

    if (picture) {
      updateData.picture = picture;
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.owner.toString() !== req.user?._id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    if (book.picture) {
      const publicId = book.picture.split("/").pop()?.split(".")[0];
      if (publicId) {
        await deleteImage(publicId);
      }
    }

    await Book.findByIdAndDelete(req.params.id);

    res.json({ message: "Book deleted" });
  } catch (error) {
    next(error);
  }
};

export const getUserBooks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    const books = await Book.find({ owner: userId });
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getMatches = async (req: AuthRequest, res: Response) => {
  try {
      const userId = req.user?._id;
      const userBooks = await Book.find({ owner: userId });
      const userBookWords = userBooks.flatMap(book => book.title.split(' '));

      const potentialMatches = await Book.find({
          owner: { $ne: userId },
      }).populate('owner', 'name email');

      const matches = potentialMatches.filter(match => {
          const matchWords = match.title.split(' ');
          const commonWords = matchWords.filter(word => userBookWords.includes(word));
          return commonWords.length >= 2;
      }).map(match => {
          return {
              bookOwnedByOther: match,
              bookOwnedByUser: userBooks.find(book => {
                  const userBookWords = book.title.split(' ');
                  const commonWords = match.title.split(' ').filter(word => userBookWords.includes(word));
                  return commonWords.length >= 2;
              }),
          };
      });

      res.status(200).json(matches);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch matches' });
  }
};