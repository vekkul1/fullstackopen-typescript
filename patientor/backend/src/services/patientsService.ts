import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients.ts';
import type {
  Patient,
  NonSensitivePatient,
  NewPatient,
  Entry,
  NewEntry,
} from '../types.ts';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientInfo = (findId: string): Patient | undefined => {
  return patients.find((patient) => patient.id === findId);
};

const getSafePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, content: NewEntry): Patient | undefined => {
  const newEntry: Entry = {
    id: uuid(),
    ...content,
  };
  patients.find((p) => p.id === id)?.entries.push(newEntry);
  return patients.find((d) => d.id === id);
};

export default {
  getPatients,
  getPatientInfo,
  getSafePatients,
  addPatient,
  addEntry,
};
