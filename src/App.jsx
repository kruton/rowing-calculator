import { Provider } from "@/components/ui/provider";
import TimeCalculator from "@/components/TimeCalculator";
import { ColorModeButton, useColorMode } from "@/components/ui/color-mode";
import { Box, Container, Flex, Text, VStack } from "@chakra-ui/react";

function AppContent() {
  const { colorMode } = useColorMode();
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
                bgGradient="to-r"
                gradientFrom={"blue.400"}
                gradientVia={["cyan.400", "purple.400", "pink.400"]}
                gradientTo={"blue.400"}
                bgClip="text"
                animation="gradientAnimation"
                style={{ textShadow: "0 0 20px rgba(0,149,255,0.15)" }}
              >
                Rowing Calculator
              </Text>
              <ColorModeButton mx={2} />
            </Flex>

            <Box
              w="100%"
              maxW="lg"
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
    <Provider>
      <AppContent />
    </Provider>
  );
}

export default App;
