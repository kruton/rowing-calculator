import { render, screen, fireEvent } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import TotalTimeCalculator from '../TotalTimeCalculator'

describe('TotalTimeCalculator', () => {
  const renderWithChakra = (component) => {
    return render(
      <ChakraProvider>
        {component}
      </ChakraProvider>
    )
  }

  it('renders all input fields', () => {
    renderWithChakra(<TotalTimeCalculator />)
    
    expect(screen.getByPlaceholderText('hr')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('min')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('sec')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter pieces')).toBeInTheDocument()
  })

  it('shows error for invalid time input', () => {
    renderWithChakra(<TotalTimeCalculator />)
    
    const minutesInput = screen.getByPlaceholderText('min')
    fireEvent.change(minutesInput, { target: { value: '60' } })
    
    expect(screen.getByText('Minutes and seconds must be less than 60')).toBeInTheDocument()
  })

  it('shows error for invalid number of pieces', () => {
    renderWithChakra(<TotalTimeCalculator />)
    
    const piecesInput = screen.getByPlaceholderText('Enter pieces')
    fireEvent.change(piecesInput, { target: { value: '0' } })
    
    expect(screen.getByText('Number of pieces must be positive')).toBeInTheDocument()
  })

  it('calculates total time correctly', () => {
    renderWithChakra(<TotalTimeCalculator />)
    
    // Set 2 minutes per piece, 3 pieces
    const minutesInput = screen.getByPlaceholderText('min')
    const piecesInput = screen.getByPlaceholderText('Enter pieces')
    
    fireEvent.change(minutesInput, { target: { value: '2' } })
    fireEvent.change(piecesInput, { target: { value: '3' } })
    
    // Expected total: 6 minutes
    expect(screen.getByText('Total Time: 6m')).toBeInTheDocument()
  })
})
