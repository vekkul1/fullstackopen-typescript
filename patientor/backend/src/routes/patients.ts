import express, { type Response, type Request } from 'express';
import patientsService from '../services/patientsService.ts';
import {
  type Patient,
  type NewPatient,
  type NonSensitivePatient,
  type NewEntry,
  // type Entry,
} from '../types.ts';
import {
  errorMiddleware,
  newEntryParser,
  newPatientParser,
} from '../middleware.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getSafePatients());
});

router.get('/:id', (req, res) => {
  res.send(patientsService.getPatientInfo(req.params.id));
});

router.post(
  '/:id/entries',
  newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res) => {
    const newPatient = patientsService.addEntry(req.params.id, req.body);
    res.json(newPatient);
  },
);

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
