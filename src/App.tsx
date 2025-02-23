import { Provider } from "@/components/ui/provider";
import TimeCalculator from "@/components/TimeCalculator";
import { WebsiteTitle } from "./components/WebsiteTitle";
import { ColorModeButton, useColorMode } from "@/components/ui/color-mode";
import { Box, Container, Flex, VStack } from "@chakra-ui/react";
import "./App.css";

function AppContent() {
  const { colorMode } = useColorMode();
  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      alignContent={"center"}
      justifyContent={"center"}
    >
      <Box minH="100vh" py={[4, 8]} px={[2, 4]}>
        <Container maxW="container.md">
          <VStack gap={[4, 4]} align="stretch">
            <Flex flex="1" justify="center" align="center">
              <WebsiteTitle />
              <ColorModeButton mx={2} />
            </Flex>

            <Box
              w="100%"
              maxW="lg"
              p={[4, 6]}
              borderRadius="lg"
              boxShadow={
                colorMode === "dark" ? "0 0 20px rgba(255,255,255,0.1)" : "md"
              }
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
