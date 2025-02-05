import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, ChakraProvider, Container, Flex, IconButton, Text, useColorMode, VStack } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import TimeCalculator from "./components/TimeCalculator";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const theme = extendTheme({
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },
  fonts: {
    heading: "'Montserrat', sans-serif",
    logo: "'Orbitron', sans-serif",
  },
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.800" : "white",
        color: props.colorMode === "dark" ? "white" : "gray.800",
      },
    }),
  },
});

function AppContent() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex width={"100vw"} height={"100vh"} alignContent={"center"} justifyContent={"center"}>
      <Box minH="100vh" py={[4, 8]} px={[2, 4]}>
        <Container maxW="container.md">
          <VStack spacing={[4, 4]} align="stretch">
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
                style={{ textShadow: "0 0 20px rgba(0,149,255,0.15)" }}
              >
                Rowing Calculator
              </Text>
              <IconButton
                ml={5}
                aria-label="Toggle color mode"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                colorScheme={colorMode === "light" ? "purple" : "yellow"}
                variant="outline"
                size="md"
              />
            </Flex>

            <Box
              w="100%"
              p={[4, 6]}
              borderRadius="lg"
              boxShadow={colorMode === "dark" ? "0 0 20px rgba(255,255,255,0.1)" : "md"}
              mx="auto"
            >
              <TimeCalculator />
            </Box>
          </VStack>
        </Container>
      </Box>
    </Flex>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppContent />
    </ChakraProvider>
  );
}

export default App;
