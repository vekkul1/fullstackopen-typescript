import { Card, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import HealthCheckForm from './HealthCheckForm';
import HospitalForm from './HospitalForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';
import { useState } from 'react';
import { NewEntry } from '../../types';

interface Props {
  onSubmit: (entry: NewEntry) => void;
  error?: string;
  formKey: number;
}

interface FormProps {
  onSubmit: (entry: NewEntry) => void;
  error?: string;
  type: string;
}

const Form = ({ type, error, onSubmit }: FormProps) => {
  switch (type) {
    case 'HealthCheck':
      return <HealthCheckForm error={error} onSubmit={onSubmit} />;
    case 'Hospital':
      return <HospitalForm error={error} onSubmit={onSubmit} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareForm error={error} onSubmit={onSubmit} />;
    default:
      assertNever(type);
  }
};

const AddEntry = ({ onSubmit, error, formKey }: Props) => {
  const [type, setType] = useState<string>('HealthCheck');
  return (
    <Card variant='outlined' sx={{ padding: '1em', marginTop: '0.5em' }}>
      {/*{error && <Alert severity='error'>{error}</Alert>}*/}
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
      <Form key={formKey} type={type} error={error} onSubmit={onSubmit} />
    </Card>
  );
};

export default AddEntry;
