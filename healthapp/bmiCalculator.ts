const parseArguments = (args: string[]) => {
  if (args.length !== 4) throw new Error('Too many or too few args.');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      h: Number(args[2]),
      w: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightMeters = height / 100;
  const heightSquared = heightMeters ** 2;
  const bmi = weight / heightSquared;
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi <= 25.0) {
    return 'Normal range';
  } else {
    return 'Overweight';
  }
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { h, w } = parseArguments(process.argv);
    console.log(calculateBmi(h, w));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
