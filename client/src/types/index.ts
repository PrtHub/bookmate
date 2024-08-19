export interface User {
    _id: string;
    name: string;
    email: string;
  }

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  picture: string;
  owner?: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface ExchangeRequestData {
  offeredBookId: string;
  requestedBookId: string;
}

export interface ExchangeRequest {
  _id: string;
  offeredBook: Book;
  requestedBook: Book;
  requester: User;
  requestee: User;
  status: "pending" | "accepted" | "rejected";
}
