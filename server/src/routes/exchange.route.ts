import { Router } from 'express';
import { auth } from '../middleware/auth';
import {
  createExchangeRequest,
  getExchangeRequests,
  getExchangeRequestById,
  updateExchangeRequest,
} from '../controllers/exchange.controller';

const router = Router();

router.post('/create', auth, createExchangeRequest);
router.get('/all', auth, getExchangeRequests);
router.get('/get/:id', auth, getExchangeRequestById);
router.put('/update/:id', auth, updateExchangeRequest);

export default router;