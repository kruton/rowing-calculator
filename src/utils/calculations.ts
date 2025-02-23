/**
 * Converts weight from pounds to kilograms
 * @param {number} pounds - Weight in pounds
 * @returns {number} Weight in kilograms
 */
export const poundsToKilograms = (pounds: number) => {
  return pounds * 0.45359237;
};

export enum WeightUnit {
  Kilograms = "kg",
  Pounds = "lbs",
}

export interface CalculateWattsPerKgParams {
  watts: number;
  weight: number;
  unit: WeightUnit;
}

/**
 * Calculates watts per kilogram
 * @param {Object} params - Calculation parameters
 * @param {number} params.watts - Power output in watts
 * @param {number} params.weight - Weight value
 * @param {string} params.unit - Weight unit ('kg' or 'lbs')
 * @returns {number} Watts per kilogram
 */
export const calculateWattsPerKg = ({
  watts,
  weight,
  unit,
}: CalculateWattsPerKgParams) => {
  if (weight <= 0) {
    throw new Error("Weight must be greater than 0");
  }

  const weightInKg =
    unit === WeightUnit.Pounds ? poundsToKilograms(weight) : weight;
  return watts / weightInKg;
};
