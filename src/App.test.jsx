import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import App from "./App";

const renderWithProviders = (ui) => {
  return render(
    <ChakraProvider>
      {ui}
    </ChakraProvider>,
  );
};

describe("App", () => {
  it("renders header and calculator", () => {
    renderWithProviders(<App />);
    expect(screen.getByText("Rowing Calculator")).toBeInTheDocument();
  });
});
