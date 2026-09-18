import express, { type Request, type Response } from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';
type ReqBody = { target: number; daily_exercises: number[] };

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  if (
    req.query.weight &&
    req.query.height &&
    !isNaN(Number(req.query.weight)) &&
    !isNaN(Number(req.query.height))
  ) {
    const weight: number = Number(req.query.weight);
    const height: number = Number(req.query.height);
    const bmi: string = calculateBmi(height, weight);
    res.json({ weight, height, bmi });
  } else {
    res.json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req: Request, res: Response) => {
  const { daily_exercises, target } = req.body as ReqBody;
  if (target && daily_exercises) {
    if (!isNaN(Number(daily_exercises)) && !isNaN(Number(target))) {
      res.json(calculateExercises(daily_exercises, target));
    } else {
      res.status(400).json({ error: 'malformatted parameters' });
    }
  } else {
    res.status(400).json({ error: 'parameters missing' });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
