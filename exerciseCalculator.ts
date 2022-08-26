interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exercises: Array<number>,
  target: number
): Result => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
