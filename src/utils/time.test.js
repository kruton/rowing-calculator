import {
  isValidNonNegativeInteger,
  isWithinTimeLimit,
  formatTimeString,
  secondsToTime,
  timeToSeconds,
  validateTimeInput
} from './time'

describe('isValidNonNegativeInteger', () => {
  test('accepts empty string', () => {
    expect(isValidNonNegativeInteger('')).toBe(true)
  })

  test('accepts valid integers', () => {
    expect(isValidNonNegativeInteger('0')).toBe(true)
    expect(isValidNonNegativeInteger('42')).toBe(true)
    expect(isValidNonNegativeInteger(42)).toBe(true)
  })

  test('rejects negative numbers', () => {
    expect(isValidNonNegativeInteger('-1')).toBe(false)
    expect(isValidNonNegativeInteger(-42)).toBe(false)
  })

  test('rejects decimals', () => {
    expect(isValidNonNegativeInteger('1.5')).toBe(false)
    expect(isValidNonNegativeInteger(1.5)).toBe(false)
  })

  test('rejects non-numeric values', () => {
    expect(isValidNonNegativeInteger('abc')).toBe(false)
    expect(isValidNonNegativeInteger('12a')).toBe(false)
  })
})

describe('isWithinTimeLimit', () => {
  test('accepts empty string', () => {
    expect(isWithinTimeLimit('', 60)).toBe(true)
  })

  test('accepts values within limit', () => {
    expect(isWithinTimeLimit('30', 60)).toBe(true)
    expect(isWithinTimeLimit(59, 60)).toBe(true)
  })

  test('rejects values over limit', () => {
    expect(isWithinTimeLimit('61', 60)).toBe(false)
    expect(isWithinTimeLimit(100, 60)).toBe(false)
  })
})

describe('formatTimeString', () => {
  test('formats full time', () => {
    expect(formatTimeString({ hours: 1, minutes: 30, seconds: 45 })).toBe('1h 30m 45s')
  })

  test('omits zero hours', () => {
    expect(formatTimeString({ minutes: 30, seconds: 45 })).toBe('30m 45s')
  })

  test('omits zero minutes', () => {
    expect(formatTimeString({ hours: 1, seconds: 45 })).toBe('1h 45s')
  })

  test('always includes seconds', () => {
    expect(formatTimeString({ hours: 1, minutes: 30 })).toBe('1h 30m 0s')
  })

  test('handles all zeros', () => {
    expect(formatTimeString({})).toBe('0s')
  })
})

describe('secondsToTime', () => {
  test('converts seconds to time object', () => {
    expect(secondsToTime(3661)).toEqual({
      hours: 1,
      minutes: 1,
      seconds: 1
    })
  })

  test('handles zero', () => {
    expect(secondsToTime(0)).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0
    })
  })

  test('handles large numbers', () => {
    expect(secondsToTime(7323)).toEqual({
      hours: 2,
      minutes: 2,
      seconds: 3
    })
  })
})

describe('timeToSeconds', () => {
  test('converts time object to seconds', () => {
    expect(timeToSeconds({ hours: 1, minutes: 1, seconds: 1 })).toBe(3661)
  })

  test('handles missing values', () => {
    expect(timeToSeconds({ minutes: 30 })).toBe(1800)
    expect(timeToSeconds({ hours: 1 })).toBe(3600)
    expect(timeToSeconds({ seconds: 45 })).toBe(45)
  })

  test('handles zero', () => {
    expect(timeToSeconds({})).toBe(0)
  })
})

describe('validateTimeInput', () => {
  test('accepts valid time', () => {
    expect(validateTimeInput({ hours: '1', minutes: '30', seconds: '45' })).toBe('')
  })

  test('accepts empty values', () => {
    expect(validateTimeInput({})).toBe('')
    expect(validateTimeInput({ minutes: '30' })).toBe('')
  })

  test('rejects invalid numbers', () => {
    expect(validateTimeInput({ minutes: 'abc' })).toBe('Please enter valid numbers')
    expect(validateTimeInput({ hours: '1.5' })).toBe('Please enter valid numbers')
  })

  test('rejects negative values', () => {
    expect(validateTimeInput({ minutes: '-1' })).toBe('Time cannot be negative')
  })

  test('rejects hours over 23', () => {
    expect(validateTimeInput({ hours: '24' })).toBe('Hours must be less than 24')
  })

  test('rejects minutes over 59', () => {
    expect(validateTimeInput({ minutes: '60' })).toBe('Minutes and seconds must be less than 60')
  })

  test('rejects seconds over 59', () => {
    expect(validateTimeInput({ seconds: '60' })).toBe('Minutes and seconds must be less than 60')
  })
})
