import * as z from "zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { addBook } from "../lib/actions/book.action";
import { useNavigate } from "react-router-dom";
import { addBookSchema } from "../lib/validation";
import { genres } from "../lib/constants";

type AddBookFormInputs = z.infer<typeof addBookSchema>;

const AddBook = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddBookFormInputs>({
    resolver: zodResolver(addBookSchema),
  });

  const navigate = useNavigate()

  const onSubmit = async (data: AddBookFormInputs) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("author", data.author);
      formData.append("genre", data.genre);
      if (data.picture && data.picture.length > 0) {
        formData.append("picture", data.picture[0]);
      }

      const response = await addBook(formData);
      console.log("Book added successfully:", response);
      toast.success("Book added!");
      navigate("/my-books");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const pictureFiles = watch("picture");

  useEffect(() => {
    if (pictureFiles && pictureFiles.length > 0) {
      const file = pictureFiles[0];
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  }, [pictureFiles]);

  return (
    <section className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[800px] bg-black-1 p-8 rounded-lg flex flex-col gap-y-6"
      >
        <h1 className="text-white-1 font-semibold text-xl text-center uppercase mb-5">
          Add New Book
        </h1>

        <div>
          <label htmlFor="title" className="text-white-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            className={`w-full p-2 mt-1 rounded outline-none bg-black-2 text-white-2 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="text-white-1">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className={`w-full p-2 mt-1 rounded outline-none bg-black-2 text-white-2 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="author" className="text-white-1">
            Author
          </label>
          <input
            id="author"
            type="text"
            className={`w-full p-2 mt-1 rounded outline-none bg-black-2 text-white-2 ${
              errors.author ? "border-red-500" : "border-gray-300"
            }`}
            {...register("author")}
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="genre" className="text-white-1">
            Genre
          </label>
          <select
            id="genre"
            className={`w-full p-2 mt-1 rounded outline-none bg-black-2 text-white-2 ${
              errors.genre ? "border-red-500" : "border-gray-300"
            }`}
            {...register("genre")}
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          {errors.genre && (
            <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="picture" className="text-white-1">
            Picture
          </label>
          <input
            id="picture"
            type="file"
            accept="image/*"
            className={`w-full p-2 mt-1 rounded outline-none bg-black-2 text-white-2 ${
              errors.picture ? "border-red-500" : "border-gray-300"
            }`}
            {...register("picture")}
          />
          {errors.picture && (
            <p className="text-red-500 text-sm mt-1">
              {errors.picture.message}
            </p>
          )}
        </div>

        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-1 text-white-1 p-2 mt-4 rounded hover:bg-orange-1/90 font-semibold"
        >
          {loading ? "Adding Book..." : "Add Book"}
        </button>
      </form>
    </section>
  );
};

export default AddBook;
