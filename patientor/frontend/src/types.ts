export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

type DischargeObject = {
  date: string;
  criteria: string;
};

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: DischargeObject;
}

type SickLeaveObject = {
  startDate: string;
  endDate: string;
};

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeaveObject;
}

export type Entry =
  HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export type NewEntry =
  | Omit<HospitalEntry, 'id'>
  | Omit<OccupationalHealthcareEntry, 'id'>
  | Omit<HealthCheckEntry, 'id'>;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type NewOccupationalHealthcareEntry = Omit<
  OccupationalHealthcareEntry,
  'id'
>;
export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Array<Entry>;
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
