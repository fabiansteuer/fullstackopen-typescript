import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises, { exerciseInputs } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weightKg = Number(req.query["weightKg"]);
  const heightCm = Number(req.query["heightCm"]);

  if (isNaN(weightKg) || isNaN(heightCm)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  try {
    const bmi = calculateBmi(weightKg, heightCm);
    return res.send({ weightKg, heightCm, bmi });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).send({ error: error.message });
    } else {
      return res.status(500).send({ error: "internal server error" });
    }
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, exercises }: exerciseInputs = req.body;

  if (typeof target === "undefined" || typeof exercises === "undefined") {
    return res.status(400).send({ error: "parameters missing from body" });
  }

  if (typeof target !== "number") {
    return res.status(400).send({ error: "malformatted target parameter" });
  }

  if (
    !Array.isArray(exercises) ||
    !exercises.every((ex) => typeof ex === "number")
  ) {
    return res.status(400).send({ error: "malformatted exercises parameter" });
  }

  try {
    return res.send(calculateExercises(exercises, target));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).send({ error: error.message });
    } else {
      return res.status(500).send({ error: "internal server error" });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
