import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import HealthCheckForm from './HealthCheckForm';
import HospitalForm from './HospitalForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';
import { useState } from 'react';
import { Diagnosis, NewEntry } from '../../types';

interface Props {
  onSubmit: (entry: NewEntry) => void;
  error?: string;
  formKey: number;
  diagnoses: Diagnosis[];
}

interface FormProps {
  onSubmit: (entry: NewEntry) => void;
  error?: string;
  type: string;
  diagnoses: Diagnosis[];
}

const Form = ({ type, error, onSubmit, diagnoses }: FormProps) => {
  switch (type) {
    case 'HealthCheck':
      return (
        <HealthCheckForm
          error={error}
          onSubmit={onSubmit}
          diagnoses={diagnoses}
        />
      );
    case 'Hospital':
      return (
        <HospitalForm error={error} onSubmit={onSubmit} diagnoses={diagnoses} />
      );
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareForm
          error={error}
          onSubmit={onSubmit}
          diagnoses={diagnoses}
        />
      );
    default:
      assertNever(type);
  }
};

const AddEntry = ({ onSubmit, error, formKey, diagnoses }: Props) => {
  const [type, setType] = useState<string>('HealthCheck');
  return (
    <Card variant='outlined' sx={{ padding: '1em', marginTop: '0.5em' }}>
      <Typography variant='h6'>New Entry:</Typography>
      {error && <Alert severity='error'>{error}</Alert>}
      <FormControl fullWidth sx={{ marginTop: '0.5em' }}>
        <InputLabel id='entry-type-label'>Entry Type</InputLabel>
        <Select
          labelId='entry-type-label'
          value={type}
          onChange={({ target }) => setType(target.value)}
          sx={{ marginTop: '0.5em' }}
        >
          <MenuItem value={'HealthCheck'}>Health Check</MenuItem>
          <MenuItem value={'Hospital'}>Hospital</MenuItem>
          <MenuItem value={'OccupationalHealthcare'}>
            Occupational Healthcare
          </MenuItem>
        </Select>
      </FormControl>
      <Form
        key={formKey}
        type={type}
        error={error}
        onSubmit={onSubmit}
        diagnoses={diagnoses}
      />
    </Card>
  );
};

export default AddEntry;
