import diagnosesData from '../../data/diagnoses.ts';
import type { Diagnosis } from '../types.ts';

const diagnoses: Diagnosis[] = diagnosesData;

const getEntries = () => {
  return diagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis,
};
