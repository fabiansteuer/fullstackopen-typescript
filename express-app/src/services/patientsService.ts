import { Patient } from "./../types";
import patients from "../data/patients";
import { PatientWithoutSsn, PatientWithoutId } from "../types";
import { v1 as uuid } from "uuid";

const list = (): PatientWithoutSsn[] => {
  const patientsWithoutSsn = patients.map((patient) => {
    return { ...patient, ssn: undefined };
  });

  return patientsWithoutSsn;
};

const retrieve = (patientId: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === patientId);
  return patient;
};

const create = (newPatientWithoutId: PatientWithoutId): Patient => {
  const newPatient = { id: uuid(), ...newPatientWithoutId, entries: [] };
  patients.push(newPatient);
  return newPatient;
};

export default {
  list,
  create,
  retrieve,
};
