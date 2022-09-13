import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateTraining } from "./exerciseCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi?", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!isNaN(height) && !isNaN(weight)) {
    return res.send({ height, weight, bmi: calculateBmi(height, weight) });
  }
  return res.send({ error: "malformatted parameters" });
});


app.get("/exercise?", (req, res) => {
  if (!req.query.target || !req.query.days) return res.send({ error: "parameters missing" });
  const parsedDays = String(req.query.days);
  var days = parsedDays.split(",");
  var checkValid = true;
  days.forEach(day => {
    if (isNaN(parseInt(day))) checkValid = false;
  });

  const target = Number(req.query.target);

  if (!isNaN(target) && checkValid) return res.send(calculateTraining(target, days));

  return res.send({ error: "malformatted parameters" });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
