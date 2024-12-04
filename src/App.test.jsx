import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'

describe('App', () => {
  const renderWithProviders = (component) => {
    return render(
      <ChakraProvider>
        {component}
      </ChakraProvider>
    )
  }

  it('renders navigation menu', () => {
    renderWithProviders(<App />)

    expect(screen.getByText('Rowing Calculator')).toBeInTheDocument()
    expect(screen.getByText('Time Calculator')).toBeInTheDocument()
    expect(screen.getByText('Watts/kg')).toBeInTheDocument()
  })
})
