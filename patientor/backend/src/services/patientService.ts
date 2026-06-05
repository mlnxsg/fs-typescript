import patients from '../../data/patients_full.ts';
import type { Patient, NonSensitivePatient, Entry } from '../types.ts';
import type { NewPatientEntry, NewEntry } from '../utils.ts';
import { v4 as uuid } from 'uuid';

const getNonSsnEntries = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    entries: [],
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = ({patientId, entry}: {patientId: string, entry: NewEntry}): Entry => {
  const patient = patients.find(p => p.id === patientId);
  const newEntry = {
    id: uuid(),
    ...entry
  };

  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSsnEntries,
  addPatient,
  findById,
  addEntry
};