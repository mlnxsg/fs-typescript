import patients from '../../data/patients.ts';
import type { Patient, NewPatientEntry, NonSsnPatient } from '../types.ts';
import { v4 as uuid } from 'uuid';

const getNonSsnEntries = (): NonSsnPatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSsnEntries,
  addPatient
};