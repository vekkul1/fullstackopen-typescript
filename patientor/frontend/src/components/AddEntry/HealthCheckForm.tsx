import {
  Select,
  Button,
  ButtonGroup,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Input,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { Diagnosis, HealthCheckRating, NewEntry } from '../../types';

interface Props {
  onSubmit: (entry: NewEntry) => void;
  diagnoses: Diagnosis[];
}

const HealthCheckForm = ({ onSubmit, diagnoses }: Props) => {
  const [date, setDate] = useState<string>('');
  const [description, setDesc] = useState<string>('');
  const [specialist, setSpec] = useState<string>('');
  const [healthCheckRating, setRate] = useState<HealthCheckRating>(0);
  const [diagnosisCodes, setCode] = useState<string[]>([]);

  const create = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'HealthCheck',
      date,
      description,
      specialist,
      healthCheckRating,
      diagnosisCodes,
    });
  };

  return (
    <form onSubmit={create}>
      <TextField
        id='date'
        label='Date'
        type='date'
        value={date}
        onChange={({ target }) => setDate(target.value)}
        required
        fullWidth
        slotProps={{ inputLabel: { shrink: true } }}
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
        <InputLabel id='rating-label' shrink>
          Health Check Rating
        </InputLabel>
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
      <FormControl fullWidth sx={{ marginTop: '0.5em' }}>
        <InputLabel id='code-label' shrink={true}>
          Diagnosis codes
        </InputLabel>
        <Select
          id='codes'
          labelId='code-label'
          multiple
          value={diagnosisCodes}
          sx={{ marginTop: '0.5em' }}
          onChange={({ target }) => setCode(target.value)}
        >
          {diagnoses.map((d) => (
            <MenuItem value={d.code}>
              {d.code} - {d.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ButtonGroup sx={{ marginTop: '0.5em' }}>
        <Button type='submit' variant='contained'>
          Submit
        </Button>
        <Button variant='outlined'>Cancel</Button>
      </ButtonGroup>
    </form>
  );
};

export default HealthCheckForm;
