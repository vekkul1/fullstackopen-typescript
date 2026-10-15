import {
  Select,
  Button,
  ButtonGroup,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  MenuItem,
  Alert,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { HealthCheckRating, NewEntry } from '../../types';

interface Props {
  error?: string;
  onSubmit: (entry: NewEntry) => void;
}

const HealthCheckForm = ({ error, onSubmit }: Props) => {
  const [date, setDate] = useState<string>('');
  const [description, setDesc] = useState<string>('');
  const [specialist, setSpec] = useState<string>('');
  const [healthCheckRating, setRate] = useState<HealthCheckRating>(0);
  const [diagnosisCodes, setCode] = useState<string>('');

  const create = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'HealthCheck',
      date,
      description,
      specialist,
      healthCheckRating,
      diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(', ') : undefined,
    });
  };

  return (
    <>
      <Typography variant='h6'>New Health Check Entry</Typography>
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
        <FormControl required fullWidth sx={{ marginTop: '0.5em' }}>
          <InputLabel id='rating-label'>Health Check Rating (0-3)</InputLabel>
          <Select
            id='rating'
            labelId='rating-label'
            value={healthCheckRating}
            onChange={({ target }) => setRate(target.value)}
            sx={{ marginTop: '0.5em' }}
          >
            <MenuItem value={0}>0 - Healthy</MenuItem>
            <MenuItem value={1}>1 - Low Risk</MenuItem>
            <MenuItem value={2}>2 - High Risk</MenuItem>
            <MenuItem value={3}>3 - Critical Risk</MenuItem>
          </Select>
        </FormControl>
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

export default HealthCheckForm;
