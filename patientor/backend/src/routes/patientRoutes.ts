import express, { type  Request, type Response, type NextFunction } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService.ts';
import { NewPatientSchema, type Patient, type NewPatientEntry, type NonSsnPatient } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSsnPatient[]>) => {
  res.send(patientService.getNonSsnEntries());
});

const newPatientParse = (req: Request, res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
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

router.use(errorMiddleware);

export default router;