import {
  PatientWithoutId,
  Gender,
  EntryWithoutId,
  EntryType,
  HealthCheckRating,
  SickLeave,
  Discharge,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

// Patient
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing SSN");
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseEntries = (): [] => {
  return [];
};

type patientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: patientFields): PatientWithoutId => {
  const newPatient: PatientWithoutId = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(),
  };

  return newPatient;
};

// Entry
const parseEntryDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const isEntryType = (type: any): type is EntryType => {
  return Object.values(EntryType).includes(type);
};

const parseType = (type: any): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error("Incorrect or missing type");
  }
  return type;
};

const parseDischarge = (discharge: any): Discharge => {
  if (
    !discharge ||
    !discharge.date ||
    !isDate(discharge.date) ||
    !discharge.criteria ||
    !isString(discharge.criteria)
  ) {
    throw new Error("Incorrect or missing discharge");
  }
  return { date: discharge.date, criteria: discharge.criteria };
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employer name");
  }
  return employerName;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (
    !sickLeave ||
    !sickLeave.startDate ||
    !isDate(sickLeave.startDate) ||
    !sickLeave.endDate ||
    !isDate(sickLeave.endDate)
  ) {
    throw new Error("Incorrect or missing sick leave");
  }
  return { startDate: sickLeave.startDate, endDate: sickLeave.endDate };
};

const isHealthCheckRating = (
  healthCheckRating: any
): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect or missing health check rating");
  }
  return healthCheckRating;
};

type EntryFields = {
  date: unknown;
  description: unknown;
  specialist: unknown;
  type: unknown;
  healthCheckRating: unknown;
  employerName: unknown;
  sickLeave: unknown;
  discharge: unknown;
};

export const toNewEntry = ({
  date,
  description,
  specialist,
  type,
  discharge,
  healthCheckRating,
  employerName,
  sickLeave,
}: EntryFields): EntryWithoutId => {
  const newBaseEntry = {
    date: parseEntryDate(date),
    description: parseDescription(description),
    specialist: parseSpecialist(specialist),
    type: parseType(type),
  };

  switch (newBaseEntry.type) {
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        type: EntryType.HealthCheck,
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
    case EntryType.OccupationalHealthcare:
      return {
        ...newBaseEntry,
        type: EntryType.OccupationalHealthcare,
        employerName: parseEmployerName(employerName),
        sickLeave: parseSickLeave(sickLeave),
      };
    case EntryType.Hospital:
      return {
        ...newBaseEntry,
        type: EntryType.Hospital,
        discharge: parseDischarge(discharge),
      };
  }
};
