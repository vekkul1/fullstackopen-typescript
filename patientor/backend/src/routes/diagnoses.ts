import express, { type Response } from 'express';
import diagnosesService from '../services/diagnosesService.ts';
import type { Diagnosis } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  const data = diagnosesService.getEntries();
  res.send(data);
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis');
});

export default router;
