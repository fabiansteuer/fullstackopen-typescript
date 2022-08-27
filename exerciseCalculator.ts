interface exerciseInputs {
  target: number;
  exercises: Array<number>;
}

interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: Array<string>): exerciseInputs => {
  if (args.length < 4) throw new Error("Not enough arguments.");

  let [, , targetString, ...exerciseStrings] = args;

  const target = Number(targetString);
  const exercises = exerciseStrings.map(Number);

  if (isNaN(target) || exercises.includes(NaN)) {
    throw new Error("Arguments must be numbers.");
  }

  return { target, exercises };
};

const calculateExercises = (
  exercises: Array<number>,
  target: number
): exerciseResult => {
  const periodLength = exercises.length;

  const trainingDays = exercises
    .map((day): number => (day > 0 ? 1 : 0))
    .reduce((a, b) => a + b);

  const average =
    trainingDays > 0 ? exercises.reduce((a, b) => a + b) / periodLength : 0;

  const success = average >= target ? true : false;

  let rating = 0;
  let ratingDescription = "";

  const difference = average - target;

  if (difference >= 0) {
    rating = 3;
    ratingDescription = "Good job";
  } else if (difference < 0) {
    rating = 2;
    ratingDescription = "Almost there";
  } else if (difference < -1) {
    rating = 1;
    ratingDescription = "Try harder";
  }

  return {
    target,
    periodLength,
    trainingDays,
    average,
    success,
    rating,
    ratingDescription,
  };
};

try {
  const { target, exercises } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(exercises, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";

  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }

  console.log(errorMessage);
}
