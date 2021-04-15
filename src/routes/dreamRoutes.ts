import express from 'express';
import { dreams_deleteAll, dreams_getAll, dreams_postAll, dreams_get, dreams_patch, dreams_delete } from '../controllers/dreamsController';

const router = express.Router();

// Get, Post, Delete for /dreams route
router.route('/')
  .get(dreams_getAll)
  .post(dreams_postAll)
  .delete(dreams_deleteAll);

// Get, Patch, Delete for specific dream
router.route('/:id')
  .get(dreams_get)
  .patch(dreams_patch)
  .delete(dreams_delete);

module.exports = router;