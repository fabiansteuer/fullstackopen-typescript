import { Patient } from "./../types";
import patients from "../data/patients";
import { PatientWithoutSsn, PatientWithoutId } from "../types";
import { v1 as uuid } from "uuid";

const list = (): Array<PatientWithoutSsn> => {
  const patientsWithoutSsn = patients.map((patient) => {
    return { ...patient, ssn: undefined };
  });

  return patientsWithoutSsn;
};

const create = (newPatientWithoutId: PatientWithoutId): Patient => {
  const newPatient = { id: uuid(), ...newPatientWithoutId };
  patients.push(newPatient);
  return newPatient;
};

export default {
  list,
  create,
};
