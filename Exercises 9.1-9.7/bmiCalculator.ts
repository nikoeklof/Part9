type Result = number | string;
const a = Number(process.argv[2]);
const b = Number(process.argv[3]);

interface CalculateValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): CalculateValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};
export const calculateBmi = (a: number, b: number): Result => {
  const height = a;
  const weight = b;
  const BMI = (weight / (height * height)) * 10000;

  if (BMI < 16) {
    return "Underweight (Severe thinness), BMI: " + BMI;
  }
  if (BMI >= 16 && BMI < 16.9) {
    return "Underweight (Moderate thinness), BMI: " + BMI;
  }
  if (BMI >= 17 && BMI < 18.4) {
    return "Underweight (Mild thinness), BMI: " + BMI;
  }
  if (BMI >= 18.5 && BMI < 25.9) {
    return "Normal range, BMI: " + BMI;
  }
  if (BMI >= 25 && BMI < 30) {
    return "Overweight (Pre-obese), BMI: " + BMI;
  }
  if (BMI >= 30 && BMI < 35) {
    return "Obese (Class I), BMI: " + BMI;
  }
  if (BMI >= 35 && BMI < 39.9) {
    return "Obese (Class II), BMI: " + BMI;
  }
  if (BMI >= 40) {
    return "Obese (Class III), BMI: " + BMI;
  }

  return -1;
};
try {
  parseArguments(process.argv);
  console.log(calculateBmi(a, b));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
export default calculateBmi;
