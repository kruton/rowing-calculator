/**
 * Converts weight from pounds to kilograms
 * @param {number} pounds - Weight in pounds
 * @returns {number} Weight in kilograms
 */
export const poundsToKilograms = (pounds) => {
  if (typeof pounds !== "number" || isNaN(pounds)) {
    throw new Error("Input must be a valid number");
  }
  return pounds * 0.45359237;
};

/**
 * Calculates watts per kilogram
 * @param {Object} params - Calculation parameters
 * @param {number} params.watts - Power output in watts
 * @param {number} params.weight - Weight value
 * @param {string} params.unit - Weight unit ('kg' or 'lbs')
 * @returns {number} Watts per kilogram
 */
export const calculateWattsPerKg = ({ watts, weight, unit }) => {
  if (typeof watts !== "number" || isNaN(watts)) {
    throw new Error("Watts must be a valid number");
  }
  if (typeof weight !== "number" || isNaN(weight)) {
    throw new Error("Weight must be a valid number");
  }
  if (weight <= 0) {
    throw new Error("Weight must be greater than 0");
  }
  if (!["kg", "lbs"].includes(unit)) {
    throw new Error("Unit must be either \"kg\" or \"lbs\"");
  }

  const weightInKg = unit === "lbs" ? poundsToKilograms(weight) : weight;
  return watts / weightInKg;
};
