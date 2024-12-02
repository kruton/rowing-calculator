import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
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
  Fade,
  useColorMode,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { extendTheme } from '@chakra-ui/react'
import WattsPerKg from './components/WattsPerKg'
import TimeCalculator from './components/TimeCalculator'
import Home from './components/Home'

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  fonts: {
    heading: "'Montserrat', sans-serif",
    logo: "'Orbitron', sans-serif",
  },
  breakpoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
})

function NavButton({ to, colorScheme, children, isMobile, onClick }) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Button
      onClick={onClick}
      colorScheme={colorScheme}
      width={isMobile ? 'full' : 'auto'}
      variant={isActive ? 'solid' : 'outline'}
      borderWidth={isActive ? '2px' : '1px'}
      boxShadow={isActive ? 'md' : 'none'}
    >
      {children}
    </Button>
  )
}

function NavigationContent({ onNavigate, isMobile }) {
  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode()

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
      align="center"
    >
      <NavButton
        to="/"
        onClick={() => handleNavigation('/')}
        colorScheme="blue"
        isMobile={isMobile}
      >
        Home
      </NavButton>
      <NavButton
        to="/watts-per-kg"
        onClick={() => handleNavigation('/watts-per-kg')}
        colorScheme="teal"
        isMobile={isMobile}
      >
        Watts/kg
      </NavButton>
      <NavButton
        to="/time-calculator"
        onClick={() => handleNavigation('/time-calculator')}
        colorScheme="purple"
        isMobile={isMobile}
      >
        Time Calculator
      </NavButton>
      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        colorScheme={colorMode === 'light' ? 'purple' : 'yellow'}
        variant="outline"
        size="md"
      />
    </Flex>
  )
}

// Wrapper component to add transitions
function AnimatedRoute({ children }) {
  const location = useLocation()
  return (
    <Fade in={true} key={location.pathname}>
      <Box>
        {children}
      </Box>
    </Fade>
  )
}

function AppContent() {
  const [isMobile] = useMediaQuery("(max-width: 48em)")
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
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
                  fontFamily="logo"
                  fontWeight="900"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  bgSize="300% 300%"
                  bgGradient="linear(to-r, blue.400, cyan.400, purple.400, pink.400, blue.400)"
                  bgClip="text"
                  css={{
                    animation: `${gradientAnimation} 8s ease infinite`,
                  }}
                  style={{ textShadow: '0 0 20px rgba(0,149,255,0.15)' }}
                >
                  Rowing Calculator
                </Text>
              </Flex>
            </Flex>

            {!isMobile && <NavigationContent isMobile={false} />}

            <Box
              w="100%"
              p={[4, 6]}
              borderRadius="lg"
              boxShadow="md"
              mx="auto"
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <AnimatedRoute>
                      <Home isMobile={isMobile} />
                    </AnimatedRoute>
                  }
                />
                <Route
                  path="/watts-per-kg"
                  element={
                    <AnimatedRoute>
                      <WattsPerKg />
                    </AnimatedRoute>
                  }
                />
                <Route
                  path="/time-calculator"
                  element={
                    <AnimatedRoute>
                      <TimeCalculator />
                    </AnimatedRoute>
                  }
                />
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
  )
}

function App() {
  // Detect if we're in the GitHub Pages subdirectory
  const basename = window.location.pathname.startsWith('/rowing-calculator')
    ? '/rowing-calculator'
    : ''

  return (
    <ChakraProvider theme={theme}>
      <Router basename={basename}>
        <AppContent />
      </Router>
    </ChakraProvider>
  )
}

export default App
