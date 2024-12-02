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
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Split Converter')).toBeInTheDocument()
    expect(screen.getByText('Total Time')).toBeInTheDocument()
    expect(screen.getByText('Watts/kg')).toBeInTheDocument()
  })

  it('navigates to Split Calculator', async () => {
    renderWithProviders(<App />)

    fireEvent.click(screen.getByText('Split Converter'))

    await waitFor(() => {
      expect(screen.getByText('Total Distance')).toBeInTheDocument()
    })
  })

  it('navigates to Total Time Calculator', async () => {
    renderWithProviders(<App />)

    fireEvent.click(screen.getByRole('button', { name: /total time/i }))

    await waitFor(() => {
      expect(screen.getByText('500m Split Time')).toBeInTheDocument()
      expect(screen.getByText('Total Distance')).toBeInTheDocument()
    })
  })

  it('shows welcome message on home page', () => {
    renderWithProviders(<App />)

    fireEvent.click(screen.getByText('Home'))

    expect(screen.getByText(/Welcome to Rowing Calculator/i)).toBeInTheDocument()
  })
})
