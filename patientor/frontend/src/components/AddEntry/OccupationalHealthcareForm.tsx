import {
  Button,
  ButtonGroup,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { NewEntry } from '../../types';

interface Props {
  error?: string;
  onSubmit: (entry: NewEntry) => void;
}

const OccupationalHealthcareForm = ({ error, onSubmit }: Props) => {
  const [date, setDate] = useState<string>('');
  const [description, setDesc] = useState<string>('');
  const [specialist, setSpec] = useState<string>('');
  const [employerName, setEmployerName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [diagnosisCodes, setCode] = useState<string>('');

  const create = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'OccupationalHealthcare',
      date,
      description,
      specialist,
      diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(', ') : undefined,
      employerName,
    });
  };

  return (
    <>
      <Typography variant='h6'>New Occupational Healthcare Entry</Typography>
      {error && <Alert severity='error'>{error}</Alert>}
      <form onSubmit={create}>
        <TextField
          id='date'
          label='Date'
          placeholder='YYYY-MM-DD'
          value={date}
          onChange={({ target }) => setDate(target.value)}
          required
          fullWidth
          sx={{ marginTop: '0.5em' }}
        />
        <TextField
          id='description'
          label='Description'
          value={description}
          onChange={({ target }) => setDesc(target.value)}
          required
          fullWidth
          sx={{ marginTop: '0.5em' }}
        />
        <TextField
          id='specialist'
          label='Specialist'
          value={specialist}
          onChange={({ target }) => setSpec(target.value)}
          required
          fullWidth
          sx={{ marginTop: '0.5em' }}
        />
        <TextField
          id='employerName'
          label='Employer Name'
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
          required
          fullWidth
          sx={{ marginTop: '0.5em' }}
        />
        <TextField
          id='startDate'
          label='Sick Leave Start Date'
          placeholder='YYYY-MM-DD'
          value={startDate}
          onChange={({ target }) => setStartDate(target.value)}
          sx={{ marginTop: '0.5em' }}
        />
        <TextField
          id='endDate'
          label='Sick Leave End Date'
          placeholder='YYYY-MM-DD'
          value={endDate}
          onChange={({ target }) => setEndDate(target.value)}
          sx={{ marginTop: '0.5em' }}
        />
        <TextField
          id='codes'
          label='Diagnosis Codes (comma separated)'
          value={diagnosisCodes}
          onChange={({ target }) => setCode(target.value)}
          fullWidth
          sx={{ marginTop: '0.5em' }}
        />
        <ButtonGroup sx={{ marginTop: '0.5em' }}>
          <Button type='submit' variant='contained'>
            Submit
          </Button>
          <Button variant='outlined'>Cancel</Button>
        </ButtonGroup>
      </form>
    </>
  );
};

export default OccupationalHealthcareForm;
