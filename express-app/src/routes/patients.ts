import express from "express";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.send(patientsService.list());
});

router.post("/", (_req, res) => {
  res.send("Saving a patient!");
});

export default router;
