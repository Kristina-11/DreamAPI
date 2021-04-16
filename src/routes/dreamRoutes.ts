import express from 'express';
import { 
  dreams_deleteAll,
  dreams_getAll, 
  dreams_postAll, 
  dreams_getOne, 
  dreams_patchOne, 
  dreams_deleteOne } from '../controllers/dreamsController';

const router = express.Router();

// Get, Post, Delete for /dreams route
router.route('/')
  .get(dreams_getAll)
  .post(dreams_postAll)
  .delete(dreams_deleteAll);

// Get, Patch, Delete for specific dream
router.route('/:id')
  .get(dreams_getOne)
  .patch(dreams_patchOne)
  .delete(dreams_deleteOne);

module.exports = router;