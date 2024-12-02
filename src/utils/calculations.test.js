import { poundsToKilograms, calculateWattsPerKg } from './calculations'

describe('poundsToKilograms', () => {
  test('converts pounds to kilograms correctly', () => {
    expect(poundsToKilograms(1)).toBeCloseTo(0.45359237)
    expect(poundsToKilograms(2.20462)).toBeCloseTo(1)
    expect(poundsToKilograms(100)).toBeCloseTo(45.359237)
  })

  test('handles decimal values', () => {
    expect(poundsToKilograms(154.32)).toBeCloseTo(70)
  })

  test('throws error for invalid input', () => {
    expect(() => poundsToKilograms('invalid')).toThrow()
    expect(() => poundsToKilograms(NaN)).toThrow()
    expect(() => poundsToKilograms(undefined)).toThrow()
  })
})

describe('calculateWattsPerKg', () => {
  test('calculates watts per kg correctly with kg input', () => {
    expect(calculateWattsPerKg({ watts: 100, weight: 70, unit: 'kg' })).toBeCloseTo(1.43)
    expect(calculateWattsPerKg({ watts: 200, weight: 70, unit: 'kg' })).toBeCloseTo(2.86)
  })

  test('calculates watts per kg correctly with lbs input', () => {
    // 154.32 lbs = 70 kg
    expect(calculateWattsPerKg({ watts: 100, weight: 154.32, unit: 'lbs' })).toBeCloseTo(1.43)
    expect(calculateWattsPerKg({ watts: 200, weight: 154.32, unit: 'lbs' })).toBeCloseTo(2.86)
  })

  test('throws error for invalid watts', () => {
    expect(() => calculateWattsPerKg({ watts: 'invalid', weight: 70, unit: 'kg' })).toThrow()
    expect(() => calculateWattsPerKg({ watts: NaN, weight: 70, unit: 'kg' })).toThrow()
  })

  test('throws error for invalid weight', () => {
    expect(() => calculateWattsPerKg({ watts: 100, weight: 0, unit: 'kg' })).toThrow()
    expect(() => calculateWattsPerKg({ watts: 100, weight: -1, unit: 'kg' })).toThrow()
    expect(() => calculateWattsPerKg({ watts: 100, weight: 'invalid', unit: 'kg' })).toThrow()
  })

  test('throws error for invalid unit', () => {
    expect(() => calculateWattsPerKg({ watts: 100, weight: 70, unit: 'invalid' })).toThrow()
    expect(() => calculateWattsPerKg({ watts: 100, weight: 70, unit: '' })).toThrow()
  })
})
