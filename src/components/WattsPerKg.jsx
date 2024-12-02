import { useState } from 'react'
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
  Select,
  HStack,
} from '@chakra-ui/react'
import { calculateWattsPerKg } from '../utils/calculations'

function WattsPerKg() {
  const [watts, setWatts] = useState('')
  const [weight, setWeight] = useState('')
  const [weightUnit, setWeightUnit] = useState('kg')

  const calculateResult = () => {
    if (watts && weight && !isNaN(watts) && !isNaN(weight) && Number(weight) > 0) {
      try {
        const wattsPerKg = calculateWattsPerKg({
          watts: Number(watts),
          weight: Number(weight),
          unit: weightUnit
        })
        return wattsPerKg.toFixed(2)
      } catch (error) {
        return null
      }
    }
    return null
  }

  const handleWattsChange = (e) => {
    setWatts(e.target.value)
  }

  const handleWeightChange = (e) => {
    setWeight(e.target.value)
  }

  const handleUnitChange = (e) => {
    setWeightUnit(e.target.value)
  }

  const result = calculateResult()

  return (
    <Stack spacing={6} align="stretch">
      <Heading size="lg" textAlign="center">Watts per Kilogram Calculator</Heading>
      
      <FormControl>
        <FormLabel>Power Output</FormLabel>
        <InputGroup>
          <Input
            type="number"
            value={watts}
            onChange={handleWattsChange}
            placeholder="Enter watts"
          />
          <InputRightAddon>watts</InputRightAddon>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Body Weight</FormLabel>
        <HStack spacing={4}>
          <InputGroup>
            <Input
              type="number"
              value={weight}
              onChange={handleWeightChange}
              placeholder="Enter weight"
            />
            <InputRightAddon>{weightUnit}</InputRightAddon>
          </InputGroup>
          <Select value={weightUnit} onChange={handleUnitChange} width="100px">
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </Select>
        </HStack>
      </FormControl>

      {result && (
        <Box p={4} bg="blue.50" borderRadius="md">
          <Text fontSize="xl" fontWeight="bold">
            Result: {result} W/kg
          </Text>
        </Box>
      )}
    </Stack>
  )
}

export default WattsPerKg
