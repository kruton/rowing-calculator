import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  VStack,
  Stack,
  Button,
  Flex,
  useMediaQuery,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Text,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { extendTheme } from '@chakra-ui/react'
import WattsPerKg from './components/WattsPerKg'
import SplitConverter from './components/SplitConverter'
import TotalTimeCalculator from './components/TotalTimeCalculator'
import Home from './components/Home'

const theme = extendTheme({
  fonts: {
    heading: "'Montserrat', sans-serif",
  },
  breakpoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },
})

function NavigationContent({ onNavigate, isMobile }) {
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    navigate(path)
    if (onNavigate) onNavigate()
  }

  return (
    <Flex
      direction={isMobile ? 'column' : 'row'}
      gap={2}
      justify="center"
      wrap="wrap"
    >
      <Button
        onClick={() => handleNavigation('/')}
        colorScheme="blue"
        width={isMobile ? 'full' : 'auto'}
      >
        Home
      </Button>
      <Button
        onClick={() => handleNavigation('/watts-per-kg')}
        colorScheme="teal"
        width={isMobile ? 'full' : 'auto'}
      >
        Watts/kg
      </Button>
      <Button
        onClick={() => handleNavigation('/split-converter')}
        colorScheme="green"
        width={isMobile ? 'full' : 'auto'}
      >
        Split Converter
      </Button>
      <Button
        onClick={() => handleNavigation('/total-time')}
        colorScheme="purple"
        width={isMobile ? 'full' : 'auto'}
      >
        Total Time
      </Button>
    </Flex>
  )
}

function App() {
  const [isMobile] = useMediaQuery("(max-width: 48em)")
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Detect if we're in the GitHub Pages subdirectory
  const basename = window.location.pathname.startsWith('/rowing-calculator')
    ? '/rowing-calculator'
    : ''

  return (
    <ChakraProvider theme={theme}>
      <Router basename={basename}>
        <Flex width={"100vw"} height={"100vh"} alignContent={"center"} justifyContent={"center"}>
          <Box minH="100vh" py={[4, 8]} px={[2, 4]}>
            <Container maxW="container.md">
              <VStack spacing={[4, 8]} align="stretch">
                <Flex align="center" justify="space-between" mb={-2}>
                  {isMobile && (
                    <IconButton
                      icon={<HamburgerIcon />}
                      onClick={onOpen}
                      aria-label="Open menu"
                      colorScheme="blue"
                      mr={4}
                    />
                  )}
                  <Flex flex="1" justify="center" align="center">
                    <Text
                      as="span"
                      fontSize={["xl", "2xl"]}
                      fontWeight="black"
                      bgGradient="linear(to-r, blue.400, teal.400)"
                      bgClip="text"
                      letterSpacing="tight"
                      mr={1}
                    >
                      Rowing
                    </Text>
                    <Text
                      as="span"
                      fontSize={["xl", "2xl"]}
                      fontWeight="black"
                      bgGradient="linear(to-r, purple.400, pink.400)"
                      bgClip="text"
                      letterSpacing="tight"
                    >
                      Calculator
                    </Text>
                  </Flex>
                </Flex>

                {!isMobile && <NavigationContent isMobile={false} />}

                <Box
                  w="100%"
                  p={[4, 6]}
                  bg="white"
                  borderRadius="lg"
                  boxShadow="md"
                  mx="auto"
                >
                  <Routes>
                    <Route path="/" element={<Home isMobile={isMobile} />} />
                    <Route path="/watts-per-kg" element={<WattsPerKg />} />
                    <Route path="/split-converter" element={<SplitConverter />} />
                    <Route path="/total-time" element={<TotalTimeCalculator />} />
                  </Routes>
                </Box>
              </VStack>
            </Container>
          </Box>

          {isMobile && (
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Navigation</DrawerHeader>
                <DrawerBody>
                  <NavigationContent isMobile={true} onNavigate={onClose} />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          )}
        </Flex>
      </Router>
    </ChakraProvider >
  )
}

export default App
