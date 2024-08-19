import { Router } from 'express';
import { auth } from '../middleware/auth';
import {
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  addBook,
  getUserBooks
} from '../controllers/book.controller';
import upload from '../config/multer';

const router = Router();

router.post('/create', auth, upload.single('picture'), addBook);
router.get('/all', getBooks);
router.get('/user-books', auth, getUserBooks);
router.get('/get/:id', getBookById);
router.put('/update/:id', auth, upload.single('picture'), updateBook);
router.delete('/delete/:id', auth, deleteBook);

export default router; 