interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface Input {
  hours: Array<number>
  target: number
}

const parseListArguments = (args: string[]): Input => {
  if (args.length < 4) throw new Error('Too Few Arguments');
  let target;
  if (!isNaN(Number(args[2]))) {
    target = Number(args[2]);
  } else {
    throw new Error('Provided values were not numbers!');
  }
  const hours = [];
  for (const a of args.slice(3)) {
    if (isNaN(Number(a))) {
      throw new Error('Provided values were not numbers!');
    }
    hours.push(Number(a));
  }
  return { hours, target };
};

export const calculateExercises = (
  hours: Array<number>,
  target: number,
): Result => {
  let sumOfHours = 0;
  let trainingDays = 0;
  for (const h of hours) {
    if (h > 0) {
      sumOfHours += h;
      trainingDays += 1;
    }
  }
  const average = sumOfHours / hours.length;
  let rating = 1;
  let ratingDescription = 'poor performance';
  if (average >= target / 2) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
    if (average >= target) {
      rating = 3;
      ratingDescription = 'crushed the target!';
    }
  }
  return {
    periodLength: hours.length,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { hours, target } = parseListArguments(process.argv);
    console.log(calculateExercises(hours, target));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
      errorMessage += ' Error:: ' + error.message;
    }
    console.log(errorMessage);
  }
}
