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

const HospitalForm = ({ error, onSubmit }: Props) => {
  const [date, setDate] = useState<string>('');
  const [description, setDesc] = useState<string>('');
  const [specialist, setSpec] = useState<string>('');
  const [diagnosisCodes, setCode] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState<string>('');

  const create = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'Hospital',
      date,
      description,
      specialist,
      diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(', ') : undefined,
      discharge: { date: dischargeDate, criteria: dischargeCriteria },
    });
  };

  return (
    <>
      <Typography variant='h6'>New Hospital Entry</Typography>
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
          id='dischargeDate'
          label='Discharge Date'
          placeholder='YYYY-MM-DD'
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
          required
          fullWidth
          sx={{ marginTop: '0.5em' }}
        />
        <TextField
          id='dischargeCriteria'
          label='Disharge Criteria'
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
          required
          fullWidth
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

export default HospitalForm;
