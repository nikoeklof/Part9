type ExerciseResult = object;

// let hours: Array<string> = [...process.argv];

// const target = Number(process.argv[2]);
// interface CalculateExcersice {
//   target: number;
//   days: Array<number>;
// }

// const parseVariables = (args: Array<string>): CalculateExcersice => {
//   if (args.length < 4) throw new Error("Not enough arguments");
//   if (!isNaN(Number(args[2]))) {
//     hours = hours.slice(3);
//     hours.forEach((day) => {
//       if (day === "0") dayArray.push(0);
//       if (parseFloat(day)) {
//         dayArray.push(parseFloat(day));
//       }
//     });
//     return {
//       target: Number(args[2]),
//       days: dayArray,
//     };
//   } else {
//     throw new Error("Invalid Arguments!");
//   }
// };
export const calculateTraining = (target: number, days: Array<string>): ExerciseResult => {
  const periodLength = days.length;
  let summedDays = 0;
  let success = false;
  let rating = 0;
  days.forEach((day) => {
    summedDays += Number(day);
  });
  console.log(summedDays);
  let ratingDescription = "";
  const average: number = summedDays / periodLength;
  let trainedDays = 0;

  days.forEach((day) => {
    if (Number(day) !== 0) trainedDays += 1;
  });
  rating = Math.round(average);
  success = average > target;
  if (average < target) {
    if (target === 1) {
      ratingDescription = "Missed target 1";
    }
    if (target === 2) {
      ratingDescription = "Not too bad but missed target 2";
    }
    if (target === 3) {
      ratingDescription = "Good job but missed target 3";
    }
  }
  if (average >= target) {
    if (target === 1) {
      ratingDescription = "Hit target 1";
    }
    if (target === 2) {
      ratingDescription = "Great!, you hit target 2";
    }
    if (target === 3) {
      ratingDescription = "Amazing! you hit target 3";
    }
  }
  return {
    periodLength: periodLength,
    trainingDays: trainedDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};
// try {
//   parseVariables(process.argv);
//   console.log(calculateTraining(target, days));
// } catch (error: unknown) {
//   let errorMessage = "Something went wrong.";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }
export default { calculateTraining };