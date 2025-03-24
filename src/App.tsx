import { Provider } from "@/components/ui/provider";
import TimeCalculator from "@/components/TimeCalculator";
import { WebsiteTitle } from "./components/WebsiteTitle";
import { ColorModeButton, useColorMode } from "@/components/ui/color-mode";
import { Box, Container, Flex, Text, VStack } from "@chakra-ui/react";
import RowingQuips from "@/components/RowingQuips";
import "./App.css";
import BuyMeACoffee from "./components/BuyMeACoffee";

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
          <VStack gap={0} align="stretch">
            <WebsiteTitle>RowCalc.com</WebsiteTitle>

            <Flex mb={4} flex="1" justify="center" align="center">
              <RowingQuips />
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

            <Flex flex="1" justify="center" align="center">
              <Box textAlign="center" mt={6} mb={2}>
                <Text
                  fontSize="xs"
                  color={colorMode === "dark" ? "whiteAlpha.600" : "gray.500"}
                  textTransform="uppercase"
                  letterSpacing="wider"
                  fontWeight="medium"
                  fontFamily="heading"
                >
                  Made by Kenny Root
                </Text>
                <BuyMeACoffee />
                <ColorModeButton mx={2} />
              </Box>
            </Flex>

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
