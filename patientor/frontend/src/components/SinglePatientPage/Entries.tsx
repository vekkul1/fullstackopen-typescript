import { Card, Paper, Typography } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
import assertNever from '../../utils';

import type {
  HealthCheckRating,
  Diagnosis,
  Entry,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
} from '../../types';

interface DiagnosesProps {
  codes: Array<Diagnosis['code']>;
  diagnoses: Diagnosis[];
}
interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}
interface EntriesProps {
  entries: Entry[];
  diagnoses: Diagnosis[];
}
interface HospitalProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}
interface HealthCheckProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}
interface OccuProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const Diagnoses = ({ codes, diagnoses }: DiagnosesProps) => {
  if (!diagnoses) {
    return;
  }
  return (
    <ul style={{ marginTop: '0.5em' }}>
      {Object.values(codes).map((code) => (
        <li key={code}>
          <Typography variant='body2'>
            {code}: {diagnoses.find((d) => d.code === code)?.name}
          </Typography>
        </li>
      ))}
    </ul>
  );
};

const Rating = ({ rating }: { rating: HealthCheckRating }) => {
  switch (rating) {
    case 0:
      return <FavoriteIcon sx={{ color: 'green' }} />;
    case 1:
      return <FavoriteIcon sx={{ color: 'yellow' }} />;
    case 2:
      return <FavoriteIcon sx={{ color: 'orange' }} />;
    case 3:
      return <FavoriteIcon sx={{ color: 'red' }} />;
  }
};

const HealthCheck = ({ entry, diagnoses }: HealthCheckProps) => {
  return (
    <Card
      component={Paper}
      elevation={2}
      sx={{ marginBottom: '1em', padding: '1em' }}
    >
      <Typography variant='h6'>
        {entry.date} <MedicalServicesIcon />
      </Typography>
      <Typography variant='body1'>
        <i>{entry.description}</i>
      </Typography>
      <Rating rating={entry.healthCheckRating} />
      <Typography variant='body2'>diagnosed by: {entry.specialist}</Typography>
      {entry.diagnosisCodes && (
        <Diagnoses codes={entry.diagnosisCodes} diagnoses={diagnoses} />
      )}
    </Card>
  );
};

const OccupationalHealthcare = ({ entry, diagnoses }: OccuProps) => {
  return (
    <Card
      component={Paper}
      elevation={2}
      sx={{ marginBottom: '1em', padding: '1em' }}
    >
      <Typography variant='h6'>
        {entry.date} <WorkIcon /> {entry.employerName}
      </Typography>
      <Typography variant='body1'>
        <i>{entry.description}</i>
      </Typography>
      {entry.sickLeave && (
        <Typography variant='body1'>
          Sickleave from {entry.sickLeave.startDate} to{' '}
          {entry.sickLeave.endDate}
        </Typography>
      )}

      <Typography variant='body2'>diagnosed by: {entry.specialist}</Typography>
      {entry.diagnosisCodes && (
        <Diagnoses codes={entry.diagnosisCodes} diagnoses={diagnoses} />
      )}
    </Card>
  );
};

const Hospital = ({ entry, diagnoses }: HospitalProps) => {
  return (
    <Card
      component={Paper}
      elevation={2}
      sx={{ marginBottom: '1em', padding: '1em' }}
    >
      <Typography variant='h6'>
        {entry.date}
        <LocalHospitalIcon />
      </Typography>
      <Typography variant='body1'>
        <i>{entry.description}</i>
      </Typography>
      <Typography variant='body1'>
        Discharged {entry.discharge.date}: {entry.discharge.criteria}
      </Typography>
      <Typography variant='body2'>diagnosed by: {entry.specialist}</Typography>
      {entry.diagnosisCodes && (
        <Diagnoses codes={entry.diagnosisCodes} diagnoses={diagnoses} />
      )}
    </Card>
  );
};

const Entry = ({ entry, diagnoses }: EntryProps) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheck entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    case 'Hospital':
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

const Entries = ({ entries, diagnoses }: EntriesProps) => {
  return (
    <div className='Entries'>
      <Typography variant='h6'>Entries</Typography>
      {Object.values(entries).map((entry: Entry) => (
        <Entry key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default Entries;
