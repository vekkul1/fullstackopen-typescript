import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { Typography } from '@mui/material';

import patientService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';
import { Diagnosis, Patient, NewEntry } from '../../types';
import Entries from './Entries';
import AddEntry from '../AddEntry';

interface SingleProps {
  id: string | undefined;
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const SinglePatientPage = ({ id, patients, setPatients }: SingleProps) => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [error, setError] = useState<string>();
  const [formKey, setFormKey] = useState<number>(0);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const d = await diagnosesService.getAll();
      setDiagnoses(d);
    };
    void fetchDiagnoses();
    const fetchPatient = async (patientId: string | undefined) => {
      if (patientId) {
        const patient = await patientService.getOne(patientId);
        setPatient(patient);
      }
    };
    void fetchPatient(id);
  }, [id]);

  if (!patient || !id) {
    return <p>404 - No patient found</p>;
  }
  if (!diagnoses || diagnoses.length === 0) {
    return <p>404- Diagnoses not loaded</p>;
  }

  const submitEntry = async (entry: NewEntry) => {
    try {
      const freshPatient = await patientService.createEntry(patient.id, entry);
      setPatient(freshPatient);
      setPatients(patients.map((p) => (p.id !== id ? p : freshPatient)));
      setFormKey(formKey + 1);
      setError(undefined);
    } catch (e: unknown) {
      if (isAxiosError(e)) {
        if (e?.response?.data.error) {
          // console.log('errori:', e.response.data.error);
          const foundError = e.response.data.error;
          const errors = [];
          for (const i in foundError) {
            const j = foundError[i].path.join(' ');
            errors.push('Error: Incorrect ' + j);
          }
          setError(errors.join(', '));
        }
      } else {
        console.error(e);
      }
    }
  };

  return (
    <div className='App'>
      <Typography variant='h5' sx={{ paddingBottom: '1em' }}>
        {patient.name}
      </Typography>
      <Typography variant='body1'>gender: {patient.gender}</Typography>
      <Typography variant='body1'>ssn: {patient.ssn}</Typography>
      <Typography variant='body1'>occupation: {patient.occupation}</Typography>
      <Typography variant='body1'>
        date of birth: {patient.dateOfBirth}
      </Typography>
      <AddEntry
        onSubmit={submitEntry}
        error={error}
        formKey={formKey}
        diagnoses={diagnoses}
      />

      {patient.entries?.length !== 0 && (
        <Entries entries={patient.entries} diagnoses={diagnoses} />
      )}
    </div>
  );
};

export default SinglePatientPage;
