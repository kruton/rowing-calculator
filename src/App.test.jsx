import { render, screen, fireEvent } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

describe('App', () => {
  const renderWithProviders = (component) => {
    return render(
      <BrowserRouter>
        <ChakraProvider>
          {component}
        </ChakraProvider>
      </BrowserRouter>
    )
  }

  it('renders navigation links', () => {
    renderWithProviders(<App />)
    
    expect(screen.getByText('Split Calculator')).toBeInTheDocument()
    expect(screen.getByText('Total Time Calculator')).toBeInTheDocument()
  })

  it('navigates to Split Calculator', () => {
    renderWithProviders(<App />)
    
    fireEvent.click(screen.getByText('Split Calculator'))
    expect(screen.getByText('Split Time Calculator')).toBeInTheDocument()
  })

  it('navigates to Total Time Calculator', () => {
    renderWithProviders(<App />)
    
    fireEvent.click(screen.getByText('Total Time Calculator'))
    expect(screen.getByText('Total Time Calculator')).toBeInTheDocument()
  })

  it('shows welcome message on home page', () => {
    renderWithProviders(<App />)
    
    expect(screen.getByText(/Welcome to the Rowing Calculator/i)).toBeInTheDocument()
  })
})
