interface ExerciseValues {
  value1: number;
  value2: number[]
}

const parseExerciseValues = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments!');
  if ((!isNaN(Number(args[2]))) && args.slice(3).every(val => !isNaN(Number(val)))) {
    return {
      value1: Number(args[2]),
      value2: args.slice(3).map(Number)
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number
}

export const calculateExercise = (values: number[], target: number): Result => {
  const periodLength = values.length;

  let trainingDays = 0;
  let total = 0;
  values.forEach(item => {
    total += item;
    if (item > 0) {
      trainingDays += 1;
    }
  });

  const average = total / periodLength;

  let rating: number;
  const ratio = average / target;
  if (ratio >= 1) {
    rating = 3;
  } else {
    rating = Number((ratio * 3).toFixed(2));
  }

  let ratingDescription: string;
  if (rating < 1) {
    ratingDescription = 'bad';
  } else if (rating >= 1 && rating < 3) {
    ratingDescription = 'could be better';
  } else {
    ratingDescription = 'good';
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { value1, value2 } = parseExerciseValues(process.argv);
    console.log(calculateExercise(value2, value1));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
