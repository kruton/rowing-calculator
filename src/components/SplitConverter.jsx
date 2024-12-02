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
  validateTimeInput
} from '../utils/time'

function SplitConverter() {
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [distance, setDistance] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const handleTimeChange = (value, setter, maxValue) => {
    if (value === '' || (isValidNonNegativeInteger(value) && isWithinTimeLimit(value, maxValue))) {
      setter(value)
    }
  }

  useEffect(() => {
    const timeError = validateTimeInput({ hours, minutes, seconds })
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

    // Calculate result
    if (!hours && !minutes && !seconds) {
      setResult(null)
      return
    }

    const totalSeconds = (Number(hours) || 0) * 3600 + (Number(minutes) || 0) * 60 + (Number(seconds) || 0)
    if (totalSeconds <= 0) {
      setResult(null)
      return
    }

    // Calculate split time for 500m
    const splitSeconds = (totalSeconds / Number(distance)) * 500
    const splitMinutes = Math.floor(splitSeconds / 60)
    const splitRemainingSeconds = Math.floor(splitSeconds % 60)

    setResult(formatTimeString({ 
      minutes: splitMinutes, 
      seconds: splitRemainingSeconds 
    }))
  }, [hours, minutes, seconds, distance])

  return (
    <Stack spacing={6} align="stretch">
      <Heading size="lg" textAlign="center">Split Time Calculator</Heading>
      
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!error}>
          <FormLabel>Total Time</FormLabel>
          <HStack spacing={1}>
            <InputGroup size="md" maxW="80px">
              <Input
                type="number"
                value={hours}
                onChange={(e) => handleTimeChange(e.target.value, setHours, 23)}
                placeholder="hr"
              />
            </InputGroup>
            <Text fontWeight="bold" fontSize="xl">:</Text>
            <InputGroup size="md" maxW="80px">
              <Input
                type="number"
                value={minutes}
                onChange={(e) => handleTimeChange(e.target.value, setMinutes, 59)}
                placeholder="min"
              />
            </InputGroup>
            <Text fontWeight="bold" fontSize="xl">:</Text>
            <InputGroup size="md" maxW="80px">
              <Input
                type="number"
                value={seconds}
                onChange={(e) => handleTimeChange(e.target.value, setSeconds, 59)}
                placeholder="sec"
              />
            </InputGroup>
          </HStack>
        </FormControl>

        <FormControl>
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
        </FormControl>

        {error && <FormErrorMessage>{error}</FormErrorMessage>}

        {result && (
          <Box p={4} bg="blue.50" borderRadius="md">
            <Text fontSize="xl" fontWeight="bold">
              500m Split: {result}
            </Text>
          </Box>
        )}
      </VStack>
    </Stack>
  )
}

export default SplitConverter
