import express from 'express';

import { verifyToken } from '../../middleware/verify-token.js';
import {
  addVideo,
  addViewCount,
  deleteVideo,
  getByTag,
  getSubscribedVideo,
  getVideo,
  randomVideos,
  searchVideo,
  trend,
  updateVideo,
} from './video.controller.js';

const router = express.Router();

router.get('/random', randomVideos);
router.get('/trending', trend);
router.get('/trend', trend);
router.get('/tags', getByTag);
router.get('/search', searchVideo);
router.get('/feed/subscriptions', verifyToken, getSubscribedVideo);
router.get('/sub', verifyToken, getSubscribedVideo);
router.get('/find/:id', getVideo);

router.post('/', verifyToken, addVideo);
router.patch('/:id/views', addViewCount);
router.put('/view/:id', addViewCount);
router.get('/:id', getVideo);
router.put('/:id', verifyToken, updateVideo);
router.delete('/:id', verifyToken, deleteVideo);

export default router;
