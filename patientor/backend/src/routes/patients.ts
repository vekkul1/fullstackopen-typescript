import express, { type Response, type Request } from 'express';
import patientsService from '../services/patientsService.ts';
import {
  type Patient,
  type NewPatient,
  type NonSensitivePatient,
} from '../types.ts';
import { errorMiddleware, newPatientParser } from '../middleware.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getSafePatients());
});

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.json(addedPatient);
  },
);

router.use(errorMiddleware);

export default router;
