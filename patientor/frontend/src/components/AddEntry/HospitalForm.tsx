import {
  Button,
  ButtonGroup,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { Diagnosis, NewEntry } from '../../types';

interface Props {
  onSubmit: (entry: NewEntry) => void;
  diagnoses: Diagnosis[];
}

const HospitalForm = ({ onSubmit, diagnoses }: Props) => {
  const [date, setDate] = useState<string>('');
  const [description, setDesc] = useState<string>('');
  const [specialist, setSpec] = useState<string>('');
  const [diagnosisCodes, setCode] = useState<string[]>([]);
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState<string>('');

  const create = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'Hospital',
      date,
      description,
      specialist,
      diagnosisCodes,
      discharge: { date: dischargeDate, criteria: dischargeCriteria },
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
        id='dischargeDate'
        label='Discharge Date'
        type='date'
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
        required
        fullWidth
        slotProps={{ inputLabel: { shrink: true } }}
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

export default HospitalForm;
