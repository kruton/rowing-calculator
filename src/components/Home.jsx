import { Box, Text, VStack, Container, Heading } from '@chakra-ui/react'

function Home() {
  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading size="xl" mb={4}>
            Welcome to Rowing Calculator
          </Heading>
          <Text fontSize="lg">
            A collection of useful tools for rowing performance calculations.
          </Text>
        </Box>

        <Box borderWidth="1px" borderRadius="lg" p={6}>
          <VStack spacing={4} align="stretch">
            <Text fontSize="md">
              <strong>Available Calculators:</strong>
            </Text>
            <Text>
              • <strong>Watts/kg:</strong> Calculate your power-to-weight ratio
            </Text>
            <Text>
              • <strong>Time Calculator:</strong> Convert between split times, total times, and distances. Enter any two values to calculate the third.
            </Text>
          </VStack>
        </Box>

        <Box borderWidth="1px" borderRadius="lg" p={6}>
          <VStack spacing={4} align="stretch">
            <Text fontSize="md">
              <strong>How to Use:</strong>
            </Text>
            <Text>
              1. Select a calculator from the navigation menu
            </Text>
            <Text>
              2. Enter your values in the input fields
            </Text>
            <Text>
              3. Results will update automatically
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Home
