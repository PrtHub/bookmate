import api from "../../services/api";

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", userData);
  return res.data;
};
