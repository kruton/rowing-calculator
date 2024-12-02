import { useState, useEffect } from 'react'
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightAddon,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

function TimeCalculator() {
  const [splitMinutes, setSplitMinutes] = useState('')
  const [splitSeconds, setSplitSeconds] = useState('')
  const [splitTenths, setSplitTenths] = useState('')
  const [totalHours, setTotalHours] = useState('')
  const [totalMinutes, setTotalMinutes] = useState('')
  const [totalSeconds, setTotalSeconds] = useState('')
  const [distance, setDistance] = useState('')
  const [error, setError] = useState('')
  const [lastTwoInputs, setLastTwoInputs] = useState([])
  const [watts, setWatts] = useState('')

  const calculatedFieldColor = useColorModeValue('gray.200', 'gray.700')

  // Track input changes
  const updateLastInputs = (inputType) => {
    setLastTwoInputs(prev => {
      const filtered = prev.filter(type => type !== inputType)
      const updated = [...filtered, inputType]
      return updated.slice(-2)
    })
  }

  useEffect(() => {
    setError('')
    if (lastTwoInputs.length < 2) return

    try {
      const splitTimeInSeconds = (splitMinutes ? Number(splitMinutes) * 60 : 0) +
        (splitSeconds ? Number(splitSeconds) : 0) +
        (splitTenths ? Number(splitTenths) / 10 : 0)
      const totalTimeInSeconds = (totalHours ? Number(totalHours) * 3600 : 0) +
        (totalMinutes ? Number(totalMinutes) * 60 : 0) +
        (totalSeconds ? Number(totalSeconds) : 0)
      const distanceInMeters = Number(distance)

      const inputsToCalculate = ['split', 'total', 'distance'].filter(
        type => !lastTwoInputs.includes(type)
      )[0]

      if (inputsToCalculate === 'split') {
        setSplitMinutes('')
        setSplitSeconds('')
        setSplitTenths('')
      } else if (inputsToCalculate === 'total') {
        setTotalHours('')
        setTotalMinutes('')
        setTotalSeconds('')
      } else if (inputsToCalculate === 'distance') {
        setDistance('')
      }

      if (lastTwoInputs.includes('split') && lastTwoInputs.includes('distance') &&
        splitTimeInSeconds > 0 && distanceInMeters > 0) {
        const totalTime = (splitTimeInSeconds / 500) * distanceInMeters
        setTotalHours(Math.floor(totalTime / 3600).toString())
        setTotalMinutes(Math.floor((totalTime % 3600) / 60).toString())
        setTotalSeconds(Math.floor(totalTime % 60).toString())
      } else if (lastTwoInputs.includes('total') && lastTwoInputs.includes('distance') &&
        totalTimeInSeconds > 0 && distanceInMeters > 0) {
        const splitTime = (totalTimeInSeconds / distanceInMeters) * 500
        setSplitMinutes(Math.floor(splitTime / 60).toString())
        setSplitSeconds(Math.floor(splitTime % 60).toString())
        setSplitTenths(Math.floor((splitTime * 10) % 10).toString())
      } else if (lastTwoInputs.includes('split') && lastTwoInputs.includes('total') &&
        splitTimeInSeconds > 0 && totalTimeInSeconds > 0) {
        const calculatedDistance = (totalTimeInSeconds / splitTimeInSeconds) * 500
        setDistance(Math.round(calculatedDistance).toString())
      }

      // Corrected watts calculation using split time in seconds
      if (splitTimeInSeconds > 0) {
        const calculatedWatts = 2.80 / Math.pow(splitTimeInSeconds / 500, 3)
        setWatts(calculatedWatts.toFixed(2))
      }
    } catch (err) {
      setError('Invalid input values')
    }
  }, [lastTwoInputs, splitMinutes, splitSeconds, splitTenths, totalHours, totalMinutes, totalSeconds, distance])

  const handleSplitChange = (value, setter) => {
    if (value === '' || (Number(value) >= 0 && Number(value) < 60)) {
      setter(value)
      updateLastInputs('split')
    }
  }

  const handleSplitTenthsChange = (value) => {
    if (value === '' || (Number(value) >= 0 && Number(value) < 10)) {
      setSplitTenths(value)
      updateLastInputs('split')
    }
  }

  const handleTotalChange = (value, setter) => {
    if (value === '' || (Number(value) >= 0 && Number(value) < 60)) {
      setter(value)
      updateLastInputs('total')
    }
  }

  const handleDistanceChange = (value) => {
    if (value === '' || Number(value) >= 0) {
      setDistance(value)
      updateLastInputs('distance')
    }
  }

  const getInputBgColor = (inputType) => {
    return lastTwoInputs.includes(inputType) ? 'transparent' : calculatedFieldColor
  }

  return (
    <VStack spacing={6} align="stretch">
      <FormControl>
        <FormLabel>Split Time (per 500m)</FormLabel>
        <HStack spacing={2} align="center">
          <InputGroup>
            <Input
              type="number"
              value={splitMinutes}
              onChange={(e) => handleSplitChange(e.target.value, setSplitMinutes)}
              placeholder="Min"
              bg={getInputBgColor('split')}
            />
          </InputGroup>
          <Text>:</Text>
          <InputGroup>
            <Input
              type="number"
              value={splitSeconds}
              onChange={(e) => handleSplitChange(e.target.value, setSplitSeconds)}
              placeholder="Sec"
              bg={getInputBgColor('split')}
            />
          </InputGroup>
          <Text>.</Text>
          <InputGroup>
            <Input
              type="number"
              value={splitTenths}
              onChange={(e) => handleSplitTenthsChange(e.target.value)}
              placeholder="Tenths"
              bg={getInputBgColor('split')}
              maxLength={1}
            />
          </InputGroup>
        </HStack>
      </FormControl>

      <FormControl>
        <FormLabel>Total Time</FormLabel>
        <HStack spacing={2} align="center">
          <InputGroup>
            <Input
              type="number"
              value={totalHours}
              onChange={(e) => handleTotalChange(e.target.value, setTotalHours)}
              placeholder="Hr"
              bg={getInputBgColor('total')}
            />
          </InputGroup>
          <Text>:</Text>
          <InputGroup>
            <Input
              type="number"
              value={totalMinutes}
              onChange={(e) => handleTotalChange(e.target.value, setTotalMinutes)}
              placeholder="Min"
              bg={getInputBgColor('total')}
            />
          </InputGroup>
          <Text>:</Text>
          <InputGroup>
            <Input
              type="number"
              value={totalSeconds}
              onChange={(e) => handleTotalChange(e.target.value, setTotalSeconds)}
              placeholder="Sec"
              bg={getInputBgColor('total')}
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
            onChange={(e) => handleDistanceChange(e.target.value)}
            placeholder="Enter distance"
            bg={getInputBgColor('distance')}
          />
          <InputRightAddon>meters</InputRightAddon>
        </InputGroup>
      </FormControl>

      {watts && (
        <Box p={4} borderRadius="md" borderWidth="1px">
          <Text fontSize="lg" fontWeight="bold">Watts: {watts}</Text>
        </Box>
      )}

      {error && (
        <Box p={4} borderRadius="md" borderWidth="1px" borderColor="red.500">
          <Text color="red.500">{error}</Text>
        </Box>
      )}

      <Box p={4} borderRadius="md" borderWidth="1px">
        <Text fontSize="md">
          Enter any two values and the third will be calculated automatically.
          Currently tracking: <strong>{lastTwoInputs.join(' and ')}</strong>
        </Text>
      </Box>
    </VStack>
  )
}

export default TimeCalculator
