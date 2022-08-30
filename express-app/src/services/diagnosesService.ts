import diagnoses from "../data/diagnoses";
import { Diagnosis } from "../types";

const list = (): Array<Diagnosis> => {
  return diagnoses;
};

const create = () => {
  return null;
};

export default {
  list,
  create,
};
