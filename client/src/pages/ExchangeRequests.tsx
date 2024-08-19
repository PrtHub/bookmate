import { useEffect, useState } from "react";
import {
  getExchangeRequests,
  updateExchangeRequest,
} from "../lib/actions/exchange.action";
import { ExchangeRequest } from "../types";
import toast from "react-hot-toast";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import RequestInfo from "../components/RequestInfo";

const ExchangeRequests = () => {
  const [requests, setRequests] = useState<ExchangeRequest[]>([]);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getExchangeRequests();
        setRequests(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load exchange requests.");
      }
    };

    fetchRequests();
  }, []);

  const handleRequestAction = async (
    id: string,
    status: "accepted" | "rejected"
  ) => {
    try {
      await updateExchangeRequest(id, { status });
      setRequests((prevRequests) =>
        prevRequests.map((req) => (req._id === id ? { ...req, status } : req))
      );
      toast.success(`Request ${status}`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        Exchange Requests
      </h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">No exchange requests received.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => {
            return (
              <div
                key={request._id}
                className="p-4 bg-black-1 shadow-md rounded-md flex flex-col md:flex-row justify-between items-start md:items-center gap-y-5 md:gap-x-10"
              >
                <section className="mb-4 md:mb-0">
                  {request.requester._id !== currentUser?.user._id ? (
                    <RequestInfo
                      user1={request.requester.name}
                      bookId1={request.offeredBook._id}
                      title1={request.offeredBook.title}
                      title2={request.requestedBook.title}
                      bookId2={request.requestedBook._id}
                      user2="me"
                    />
                  ) : (
                    <RequestInfo
                      user1="You"
                      bookId1={request.offeredBook._id}
                      title1={request.offeredBook.title}
                      title2={request.requestedBook.title}
                      bookId2={request.requestedBook._id}
                      user2={request.requestee.name}
                    />
                  )}
                  {request.status === "accepted" && (
                    <p className="text-gray-500 text-sm">
                      {request.requester.email}
                    </p>
                  )}
                </section>
                {request.status !== "pending" ? (
                  <p className="text-sm text-gray-1 font-semibold mt-2 md:mt-0">
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)}
                  </p>
                ) : request.requester._id !== currentUser?.user._id ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        handleRequestAction(request._id, "accepted")
                      }
                      className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark"
                      disabled={request.status !== "pending"}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleRequestAction(request._id, "rejected")
                      }
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                      disabled={request.status !== "pending"}
                    >
                      Decline
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-1 font-semibold mt-2 md:mt-0">
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ExchangeRequests;
