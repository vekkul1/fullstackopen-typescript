import { z } from 'zod';

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatient {
  id: string;
  entries: Entry[];
}
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

// interface BaseEntry {
//   id: string;
//   description: string;
//   date: string;
//   specialist: string;
//   diagnosisCodes?: Array<Diagnosis['code']>;
// }
//
// // export const BaseEntrySchema = z.object({
// //   id: z.uuid(),
// //   description: z.string(),
// //   date: z.iso.date(),
// //   specialist: z.string(),
// //   diagnosisCodes: z.array(Diagnosis).optional(),
// // });
// //
const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;
//
// type HealthCheckRating =
//   (typeof HealthCheckRating)[keyof typeof HealthCheckRating];
//
// interface HealthCheckEntry extends BaseEntry {
//   type: 'HealthCheck';
//   healthCheckRating: HealthCheckRating;
// }
//
// type DischargeObject = {
//   date: string;
//   criteria: string;
// };
//
// interface HospitalEntry extends BaseEntry {
//   type: 'Hospital';
//   discharge: DischargeObject;
// }
//
// type SickLeaveObject = {
//   startDate: string;
//   endDate: string;
// };
//
// interface OccupationalHealthcareEntry extends BaseEntry {
//   type: 'OccupationalHealthcare';
//   employerName: string;
//   sickLeave?: SickLeaveObject;
// }
//
// export type Entry =
//   HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
// const DiagnosisSchema = z.object({
//   code: z.string(),
//   name: z.string(),
//   latin: z.string().optional(),
// });

const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const DischargeSchema = z.object({
  date: z.iso.date(),
  criteria: z.string(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  discharge: DischargeSchema,
  type: z.literal('Hospital'),
});

const SickLeaveSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

const OccupationalHealthcareSchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional(),
});

const HealthCheckRatingSchema = z.union([
  z.literal(HealthCheckRating.Healthy),
  z.literal(HealthCheckRating.LowRisk),
  z.literal(HealthCheckRating.HighRisk),
  z.literal(HealthCheckRating.CriticalRisk),
]);

const HealthCheckSchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: HealthCheckRatingSchema,
});

export const NewEntrySchema = z.discriminatedUnion('type', [
  HealthCheckSchema,
  HospitalEntrySchema,
  OccupationalHealthcareSchema,
]);

export type NewEntry = z.infer<typeof NewEntrySchema>;

export const EntrySchema = z.discriminatedUnion('type', [
  HealthCheckSchema.extend({ id: z.uuid() }),
  HospitalEntrySchema.extend({ id: z.uuid() }),
  OccupationalHealthcareSchema.extend({ id: z.uuid() }),
]);

export type Entry = z.infer<typeof EntrySchema>;
