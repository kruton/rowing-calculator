import {
  calculateWattsPerKg,
  poundsToKilograms,
  splitSecondsToWatts,
  wattsToSplitSeconds,
  WeightUnit,
} from "./calculations";

describe("poundsToKilograms", () => {
  test("converts pounds to kilograms correctly", () => {
    expect(poundsToKilograms(1)).toBeCloseTo(0.45359237);
    expect(poundsToKilograms(2.20462)).toBeCloseTo(1);
    expect(poundsToKilograms(100)).toBeCloseTo(45.359237);
  });

  test("handles decimal values", () => {
    expect(poundsToKilograms(154.32)).toBeCloseTo(70);
  });
});

describe("calculateWattsPerKg", () => {
  test("calculates watts per kg correctly with kg input", () => {
    expect(
      calculateWattsPerKg({
        watts: 100,
        weight: 70,
        unit: WeightUnit.Kilograms,
      })
    ).toBeCloseTo(1.43);
    expect(
      calculateWattsPerKg({
        watts: 200,
        weight: 70,
        unit: WeightUnit.Kilograms,
      })
    ).toBeCloseTo(2.86);
  });

  test("calculates watts per kg correctly with lbs input", () => {
    // 154.32 lbs = 70 kg
    expect(
      calculateWattsPerKg({
        watts: 100,
        weight: 154.32,
        unit: WeightUnit.Pounds,
      })
    ).toBeCloseTo(1.43);
    expect(
      calculateWattsPerKg({
        watts: 200,
        weight: 154.32,
        unit: WeightUnit.Pounds,
      })
    ).toBeCloseTo(2.86);
  });

  test("throws error for invalid weight", () => {
    expect(() =>
      calculateWattsPerKg({ watts: 100, weight: 0, unit: WeightUnit.Kilograms })
    ).toThrow();
    expect(() =>
      calculateWattsPerKg({
        watts: 100,
        weight: -1,
        unit: WeightUnit.Kilograms,
      })
    ).toThrow();
  });
});

describe("splitSecondsToWatts", () => {
  test("converts split seconds to watts correctly", () => {
    // Standard test cases based on common rowing formulas
    expect(splitSecondsToWatts(135)).toBeCloseTo(142.255);
    expect(splitSecondsToWatts(110)).toBeCloseTo(262.96);
    expect(splitSecondsToWatts(90)).toBeCloseTo(480.109);
  });

  test("handles edge cases", () => {
    // Very fast splits (low time)
    expect(splitSecondsToWatts(60)).toBeCloseTo(1620.37); // 1:00.0 /500m ≈ 1620.37W

    // Very slow splits (high time)
    expect(splitSecondsToWatts(600)).toBeCloseTo(1.62); // 10:00.0 /500m ≈ 1.62W
  });
});

describe("wattsToSplitSeconds", () => {
  test("converts watts to split seconds correctly", () => {
    // Standard test cases based on common rowing formulas
    expect(wattsToSplitSeconds(100)).toBeCloseTo(151.829); // 100W ≈ 2:31.829 /500m
    expect(wattsToSplitSeconds(200)).toBeCloseTo(120.507); // 200W ≈ 2:00.507 /500m
    expect(wattsToSplitSeconds(300)).toBeCloseTo(105.273); // 300W ≈ 1:45.273 /500m
  });

  test("handles edge cases", () => {
    // Very high watts
    expect(wattsToSplitSeconds(800)).toBeCloseTo(75.914); // 800W ≈ 1:00.0 /500m

    // Low watts
    expect(wattsToSplitSeconds(50)).toBeCloseTo(191.29); // 50W ≈ 2:31.7 /500m
  });
});
