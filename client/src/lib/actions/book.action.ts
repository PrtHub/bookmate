import api from "../../services/api";

export const getBooks = async () => {
  try {
    const res = await api.get("/book/all");
    return res.data;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
};

export const addBook = async (bookData: FormData) => {
  try {
    const res = await api.post("/book/create", bookData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

export const getUserBooks = async () => {
  try {
    const res = await api.get("/book/user-books");
    return res.data;
  } catch (error) {
    console.error("Error fetching user books:", error);
    throw error;
  }
}

export const getBookById = async (id: string) => {
  try {
    const res = await api.get(`/book/get/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
}

export const updateBook = async (bookData: FormData, id: string) => {
  try {
    const res = await api.put(`/book/update/${id}`, bookData, {
    });
    return res.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

export const deleteBook = async (id: string) => {
  try {
    const res = await api.delete(`/book/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
}

export const getMatches = async () => {
  try {
    const res = await api.get("/book/matches");
    return res.data
  } catch (error) {
    console.error("Error fetching matching book:", error);
    throw error;
  }
}