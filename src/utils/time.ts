/**
 * Validates if a value is a valid non-negative integer
 * @param {string|number} value - The value to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidNonNegativeInteger = (value: string | number): boolean => {
  if (value === "") return true;
  const num = Number(value);
  return Number.isInteger(num) && num >= 0;
};

/**
 * Validates if a time value is within its maximum allowed value
 * @param {string|number} value - The value to validate
 * @param {number} maxValue - The maximum allowed value
 * @returns {boolean} - True if valid, false otherwise
 */
export const isWithinTimeLimit = (value: string | number, maxValue: number) => {
  if (value === "") return true;
  const num = Number(value);
  return num <= maxValue;
};

/**
 * Formats a time duration into a string with units
 * @param {Object} time - The time object containing hours, minutes, and seconds
 * @param {number} [time.hours] - Hours component
 * @param {number} [time.minutes] - Minutes component
 * @param {number} [time.seconds] - Seconds component
 * @returns {string} - Formatted time string (e.g., "1h 30m 45s")
 */
export const formatTimeString = ({ hours = 0, minutes = 0, seconds = 0 }) => {
  return [
    hours > 0 ? `${hours}h` : "",
    minutes > 0 ? `${minutes}m` : "",
    `${seconds}s`,
  ]
    .filter(Boolean)
    .join(" ");
};

/**
 * Converts total seconds to hours, minutes, and seconds
 * @param {number} totalSeconds - Total number of seconds
 * @returns {Object} - Object containing hours, minutes, and seconds
 */
export const secondsToTime = (totalSeconds: number): object => {
  const hours = Math.floor(totalSeconds / 3600);
  const remainingSeconds = totalSeconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = Math.floor(remainingSeconds % 60);
  return { hours, minutes, seconds };
};

/**
 * Converts hours, minutes, and seconds to total seconds
 * @param {Object} time - The time object
 * @param {number} [time.hours] - Hours component
 * @param {number} [time.minutes] - Minutes component
 * @param {number} [time.seconds] - Seconds component
 * @returns {number} - Total seconds
 */
export const timeToSeconds = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
}: {
  hours?: number;
  minutes?: number;
  seconds?: number;
}): number => {
  return hours * 3600 + minutes * 60 + seconds;
};

/**
 * Validates time input and returns appropriate error message
 * @param {Object} time - The time object
 * @param {string|number} [time.hours] - Hours component
 * @param {string|number} [time.minutes] - Minutes component
 * @param {string|number} [time.seconds] - Seconds component
 * @returns {string} - Error message if invalid, empty string if valid
 */
export const validateTimeInput = ({
  hours = "",
  minutes = "",
  seconds = "",
}: {
  hours?: string | number;
  minutes?: string | number;
  seconds?: string | number;
}): string => {
  const nums = [
    hours && Number(hours),
    minutes && Number(minutes),
    seconds && Number(seconds),
  ].filter(Boolean);

  // Check for negative values first
  if (nums.some((num) => typeof num === "number" && num < 0)) {
    return "Time cannot be negative";
  }

  // Then check for invalid integers
  if (
    (hours && !Number.isInteger(Number(hours))) ||
    (minutes && !Number.isInteger(Number(minutes))) ||
    (seconds && !Number.isInteger(Number(seconds)))
  ) {
    return "Please enter valid numbers";
  }

  // Check maximum values
  if (Number(hours) > 23) {
    return "Hours must be less than 24";
  }

  if (Number(minutes) >= 60 || Number(seconds) >= 60) {
    return "Minutes and seconds must be less than 60";
  }

  return "";
};
