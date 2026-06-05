import express, { type  Request, type Response, type NextFunction } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService.ts';
import type { Patient, NonSensitivePatient, Entry } from '../types.ts';
import { NewPatientSchema, type NewPatientEntry, NewEntrySchema, type NewEntry } from '../utils.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSsnEntries());
});

router.get('/:id', (req: Request, res: Response<Patient>) => {
  const patient = patientService.findById(String(req.params.id));
  if (!patient) {
    res.sendStatus(404);
  }
  res.send(patient);
});

const newPatientParse = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParse = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({error: error.issues});
  } else {
    next(error);
  }
};

router.post('/', newPatientParse, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
  const addedEntry = patientService.addPatient(req.body);
  res.json(addedEntry);
});

router.post('/:id/entries', newEntryParse, (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
  const addedData = patientService.addEntry({ patientId: String(req.params.id), entry: req.body });
  res.json(addedData);
});

router.use(errorMiddleware);

export default router;