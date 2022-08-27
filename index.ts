import express from "express";
import calculateBmi from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weightKg = Number(req.query["weightKg"]);
  const heightCm = Number(req.query["heightCm"]);

  if (isNaN(weightKg) || isNaN(heightCm)) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  try {
    const bmi = calculateBmi(weightKg, heightCm);
    res.json({ weightKg, heightCm, bmi });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send({ error: "internal server error" });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
