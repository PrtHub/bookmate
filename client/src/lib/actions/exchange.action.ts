import api from "../../services/api";

export const createExchangeRequest = async (exchangeRequestData: {
  offeredBookId: string;
  requestedBookId: string;
}) => {
  try {
    const response = await api.post(
      "/exchange-request/create",
      exchangeRequestData
    );
    return response.data;
  } catch (error) {
    console.log("Error creating exchange request:", error);
    throw error;
  }
};

export const getExchangeRequests = async () => {
  try {
    const res = await api.get("/exchange-request/all");
    return res.data;
  } catch (error) {
    console.log("Error fetching exchange request:", error);
    throw error;
  }
};

export const updateExchangeRequest = async (id: string, updateData: {
    status: "accepted" | "rejected";
  }) => {
    try {
      const response = await api.put(`/exchange-request/update/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.log("Error updating exchange request:", error);
      throw error;
    }
  }