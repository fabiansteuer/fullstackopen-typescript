import patients from "../data/patients";
import { Entry, EntryWithoutId } from "../types";
import { v1 as uuid } from "uuid";

const create = ({
  patientId,
  newEntryWithoutId,
}: {
  patientId: string;
  newEntryWithoutId: EntryWithoutId;
}): Entry => {
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  const newEntry = { id: uuid(), ...newEntryWithoutId };
  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  create,
};
