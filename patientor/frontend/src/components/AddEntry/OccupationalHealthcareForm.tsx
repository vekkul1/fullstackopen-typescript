import {
  Button,
  ButtonGroup,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { Diagnosis, NewEntry } from '../../types';

interface Props {
  onSubmit: (entry: NewEntry) => void;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareForm = ({ onSubmit, diagnoses }: Props) => {
  const [date, setDate] = useState<string>('');
  const [description, setDesc] = useState<string>('');
  const [specialist, setSpec] = useState<string>('');
  const [employerName, setEmployerName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [diagnosisCodes, setCode] = useState<string[]>([]);

  const create = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'OccupationalHealthcare',
      date,
      description,
      specialist,
      diagnosisCodes,
      employerName,
      sickLeave: endDate || startDate ? { startDate, endDate } : undefined,
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
        type='date'
        slotProps={{ inputLabel: { shrink: true } }}
        value={startDate}
        onChange={({ target }) => setStartDate(target.value)}
        sx={{ marginTop: '0.5em' }}
      />
      <TextField
        id='endDate'
        label='Sick Leave End Date'
        value={endDate}
        type='date'
        slotProps={{ inputLabel: { shrink: true } }}
        onChange={({ target }) => setEndDate(target.value)}
        sx={{ marginTop: '0.5em' }}
      />
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

export default OccupationalHealthcareForm;
