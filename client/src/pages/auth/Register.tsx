import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../lib/actions/auth.action";
import { AppDispatch } from "../../store/store";
import { addUser } from "../../store/userSlice";
import { registerSchema } from "../../lib/validation";
import { useState } from "react";

type RegisterFormInputs = z.infer<typeof registerSchema>;

const Register = () => {
  const [loading, setLoading] = useState<boolean>(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: RegisterFormInputs) => {
    setLoading(true);
    try {
      const user = await registerUser(data);
      localStorage.setItem("swap_token", user.token);
      dispatch(addUser(user));
      navigate("/");
      toast.success("User registered!");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="max-w-[380px] w-full h-fit p-10 rounded-lg bg-black-1 flex flex-col gap-y-4">
        <h1 className="text-white-1 font-semibold text-lg text-center uppercase">
          Register to Book<span className="text-orange-1">Mate</span>
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <div>
            <label htmlFor="name" className="text-white-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              className={`w-full p-2 mt-1 rounded outline-none bg-black-2 text-white-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="text-white-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full p-2 mt-1 rounded outline-none bg-black-2 text-white-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="text-white-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`w-full p-2 mt-1 rounded outline-none bg-black-2 text-white-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-1 text-white-1 p-2 mt-4 rounded hover:bg-orange-2"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <span className="text-white-1">
          Don't have an account?{" "}
          <Link
            to="/login"
            className="text-orange-1 hover:underline transition"
          >
            Login
          </Link>
        </span>
      </div>
    </section>
  );
};

export default Register;
