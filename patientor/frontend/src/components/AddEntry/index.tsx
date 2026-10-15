import {
  Card,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Alert,
} from '@mui/material';
import HealthCheckForm from './HealthCheckForm';
import HospitalForm from './HospitalForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';
import { useState } from 'react';
import { Diagnosis, Entry, NewEntry } from '../../types';
import assertNever from '../../utils';

interface Props {
  onSubmit: (entry: NewEntry) => void;
  error?: string;
  formKey: number;
  diagnoses: Diagnosis[];
  modalOpen: boolean;
  onClose: () => void;
}

interface FormProps {
  onSubmit: (entry: NewEntry) => void;
  onClose: () => void;
  type: Entry['type'];
  diagnoses: Diagnosis[];
}

const Form = ({ type, onClose, onSubmit, diagnoses }: FormProps) => {
  switch (type) {
    case 'HealthCheck':
      return (
        <HealthCheckForm
          onClose={onClose}
          onSubmit={onSubmit}
          diagnoses={diagnoses}
        />
      );
    case 'Hospital':
      return (
        <HospitalForm
          onClose={onClose}
          onSubmit={onSubmit}
          diagnoses={diagnoses}
        />
      );
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareForm
          onClose={onClose}
          onSubmit={onSubmit}
          diagnoses={diagnoses}
        />
      );
    default:
      assertNever(type);
  }
};

const AddEntry = ({
  onSubmit,
  error,
  formKey,
  diagnoses,
  modalOpen,
  onClose,
}: Props) => {
  const [type, setType] = useState<Entry['type']>('HealthCheck');
  return (
    <Dialog fullWidth open={modalOpen} onClose={() => onClose()}>
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
          onSubmit={onSubmit}
          onClose={onClose}
          diagnoses={diagnoses}
        />
      </Card>
    </Dialog>
  );
};

export default AddEntry;
