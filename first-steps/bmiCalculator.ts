const calculateBmi = (weightKg: number, heightCm: number): string => {
  const bmi = weightKg / (heightCm / 100) ** 2;

  if (!isFinite(bmi)) {
    throw new Error("BMI can't be calculated for height of 0cm.");
  }

  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 17) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 35) {
    return "Obese (Class I)";
  } else if (bmi < 40) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

export default calculateBmi;

// Command line code

// interface bmiInputs {
//   weightKg: number;
//   heightCm: number;
// }
//
// const parseBmiArguments = (args: string[]): bmiInputs => {
//   if (args.length < 4) throw new Error("Not enough arguments.");
//   if (args.length > 4) throw new Error("Too many arguments.");

//   const weightKg: number = Number(args[2]);
//   const heightCm: number = Number(args[3]);

//   if (isNaN(weightKg) || isNaN(heightCm)) {
//     throw new Error("Arguments must be numbers.");
//   }

//   return { weightKg, heightCm };
// };

// try {
//   const { weightKg, heightCm } = parseBmiArguments(process.argv);
//   console.log(
//     `${calculateBmi(
//       weightKg,
//       heightCm
//     )} BMI for weight of ${weightKg}kg and height of ${heightCm}cm.`
//   );
// } catch (error: unknown) {
//   let errorMessage = "Something went wrong.";

//   if (error instanceof Error) {
//     errorMessage += ` Error: ${error.message}`;
//   }

//   console.log(errorMessage);
// }
