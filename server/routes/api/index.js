import express from 'express';
import address from './address';
import smilebox from './smilebox';

const router = express.Router();
router.use('/smilebox', smilebox);
router.use('/address', address);

export default router;