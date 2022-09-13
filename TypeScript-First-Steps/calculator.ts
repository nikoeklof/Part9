type Result = string | number
const a: number = Number(process.argv[3])
const b: number = Number(process.argv[4])
const operation: string = String(process.argv[2])
interface CalculateValues {
  value1: number
  value2: number
}

const parseArguments = (args: Array<string>): CalculateValues => {
  if (args.length < 5) throw new Error("Not enough arguments")
  if (args.length > 5) throw new Error("Too many arguments")

  if (!isNaN(Number(args[3])) && !isNaN(Number(args[4]))) {
    return {
      value1: Number(args[3]),
      value2: Number(args[4]),
    }
  } else {
    throw new Error("Provided values were not numbers!")
  }
}

const multiplicator = (a: number, b: number, op: string): Result => {
  switch (op) {
    case "multiply":
      return `Multiplied ${a} and ${b}, the result is: ` + a * b
    case "add":
      return `Summed up ${a} and ${b}, the result is: ` + (a + b)
    case "divide":
      if (b === 0) throw new Error("Can't divide by zero!")
      return `Divided ${a} and ${b}, the result is: ` + a / b
    default:
      throw new Error("Operation is not multiply, add or divide!")
  }
}
try {
  const { value1, value2 } = parseArguments(process.argv)
  console.log(multiplicator(a, b, operation))
} catch (error: unknown) {
  let errorMessage = "Something went wrong."
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message
  }
  console.log(errorMessage)
}
