import * as z from "zod";
import { genres } from "./constants";

export const registerSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

export const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

export const editSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    author: z.string().min(1, "Author is required"),
    genre: z
      .string()
      .refine((val) => genres.includes(val as (typeof genres)[number]), {
        message: "Select a valid genre",
      }),
    picture: z
      .instanceof(FileList)
      .refine(
        (files) => files.length === 0 || files.length > 0,
        "Picture is required"
      )
      .optional(),
  });


  export const addBookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    author: z.string().min(1, "Author is required"),
    genre: z.enum(genres, {
      errorMap: () => ({ message: "Select a valid genre" }),
    }),
    picture: z
      .instanceof(FileList)
      .refine((files) => files.length > 0, "Picture is required"),
  });