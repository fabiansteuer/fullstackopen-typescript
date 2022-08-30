import patients from "../data/patients";
import { PatientWithoutSsn } from "../types";

const list = (): Array<PatientWithoutSsn> => {
  const patientsWithoutSsn = patients.map((patient) => {
    return { ...patient, ssn: undefined };
  });

  return patientsWithoutSsn;
};

const create = () => {
  return null;
};

export default {
  list,
  create,
};
