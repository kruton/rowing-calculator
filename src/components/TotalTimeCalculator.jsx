import { useState, useEffect } from 'react'
import {
  Box,
  Heading,
  Input,
  Stack,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightAddon,
  FormErrorMessage,
  HStack,
  VStack,
} from '@chakra-ui/react'
import {
  isValidNonNegativeInteger,
  isWithinTimeLimit,
  formatTimeString,
  validateTimeInput,
  secondsToTime
} from '../utils/time'

function TotalTimeCalculator() {
  const [splitMinutes, setSplitMinutes] = useState('')
  const [splitSeconds, setSplitSeconds] = useState('')
  const [distance, setDistance] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const handleTimeChange = (value, setter, maxValue) => {
    if (value === '' || (isValidNonNegativeInteger(value) && isWithinTimeLimit(value, maxValue))) {
      setter(value)
    }
  }

  useEffect(() => {
    const timeError = validateTimeInput({ minutes: splitMinutes, seconds: splitSeconds })
    if (timeError) {
      setError(timeError)
      setResult(null)
      return
    }

    if (!distance) {
      setError('')
      setResult(null)
      return
    }

    if (!Number.isInteger(Number(distance)) || Number(distance) <= 0) {
      setError('Distance must be a positive whole number')
      setResult(null)
      return
    }

    setError('')

    // Calculate total time
    const mins = Number(splitMinutes || 0)
    const secs = Number(splitSeconds || 0)
    const splitTotalSeconds = mins * 60 + secs

    if (splitTotalSeconds === 0) {
      setResult(null)
      return
    }

    const totalSeconds = (splitTotalSeconds * Number(distance)) / 500
    const time = secondsToTime(totalSeconds)
    setResult(formatTimeString(time))
  }, [splitMinutes, splitSeconds, distance])

  return (
    <Stack spacing={6} align="stretch">
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!error}>
          <FormLabel>500m Split Time</FormLabel>
          <HStack spacing={1}>
            <InputGroup size="md" maxW="100px">
              <Input
                type="number"
                value={splitMinutes}
                onChange={(e) => handleTimeChange(e.target.value, setSplitMinutes, 59)}
                placeholder="min"
              />
            </InputGroup>
            <Text fontWeight="bold" fontSize="xl">:</Text>
            <InputGroup size="md" maxW="100px">
              <Input
                type="number"
                value={splitSeconds}
                onChange={(e) => handleTimeChange(e.target.value, setSplitSeconds, 59)}
                placeholder="sec"
              />
            </InputGroup>
          </HStack>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!error}>
          <FormLabel>Total Distance</FormLabel>
          <InputGroup>
            <Input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="Enter distance"
            />
            <InputRightAddon>meters</InputRightAddon>
          </InputGroup>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>

        {result && (
          <Box p={4} bg="blue.50" borderRadius="md">
            <Text fontSize="xl" fontWeight="bold">
              Total Time: {result}
            </Text>
          </Box>
        )}
      </VStack>
    </Stack>
  )
}

export default TotalTimeCalculator
