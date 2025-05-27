import express from 'express'

import {verifyPayment} from '../Controller/VerfiyPayementController';
import {createOrder} from '../Controller/RazorpayController';

const router = express.Router()

// routes of payment
router.post('/api/createorder',createOrder);
router.post('/api/verifypayment',verifyPayment);

export default router