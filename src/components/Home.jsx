import {
  Box,
  Heading,
  Stack,
  VStack,
} from '@chakra-ui/react'

function Home({ isMobile }) {
  return (
    <Stack spacing={6} align={"stretch"}>
      <VStack spacing={4} align="stretch">
        <Heading size="lg">Welcome to Rowing Calculator</Heading>
        <Box fontSize="lg" color="gray.600">
          Select a calculation tool from the menu {isMobile ? 'in the top left' : 'above'} to get started.
          This app helps you calculate:
        </Box>
        <VStack spacing={2} align="start" fontSize="md" color="gray.700">
          <Box>• Power-to-weight ratio (watts per kilogram)</Box>
          <Box>• 500m split times from total time and distance</Box>
          <Box>• Total time from 500m split and distance</Box>
        </VStack>
      </VStack>
    </Stack>
  )
}

export default Home
