import {
  calculateWattsPerKg,
  poundsToKilograms,
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
