import diagnoses from "../data/diagnoses";
import { Diagnosis } from "../types";

const list = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  list,
};
