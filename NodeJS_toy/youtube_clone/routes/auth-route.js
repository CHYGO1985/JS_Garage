import express from 'express';
import {
  signup,
  signin,
} from '../controllers/auth-controller.js';

const router = express.Router();

export default router;
