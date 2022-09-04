import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.send(patientsService.list());
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const createdPatient = patientsService.create(newPatient);

    return res.send(createdPatient);
  } catch (error: unknown) {
    let errorMessage = "";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = "Unknown error.";
    }

    return res.status(400).send({ error: errorMessage });
  }
});

export default router;
