import express from 'express';
import {getAllUsers, getUserId} from '../controllers/userControllers.js';

const router= express.Router();

router.get('/:id', getUserId);
router.get('/', getAllUsers);

export default router;