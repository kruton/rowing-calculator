import { render, screen, fireEvent } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import SplitConverter from '../SplitConverter'

describe('SplitConverter', () => {
  const renderWithChakra = (component) => {
    return render(
      <ChakraProvider>
        {component}
      </ChakraProvider>
    )
  }

  it('renders all input fields', () => {
    renderWithChakra(<SplitConverter />)
    
    expect(screen.getByPlaceholderText('hr')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('min')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('sec')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter distance')).toBeInTheDocument()
  })

  it('shows error for invalid time input', () => {
    renderWithChakra(<SplitConverter />)
    
    const minutesInput = screen.getByPlaceholderText('min')
    fireEvent.change(minutesInput, { target: { value: '60' } })
    
    expect(screen.getByText('Minutes and seconds must be less than 60')).toBeInTheDocument()
  })

  it('shows error for invalid distance', () => {
    renderWithChakra(<SplitConverter />)
    
    const distanceInput = screen.getByPlaceholderText('Enter distance')
    fireEvent.change(distanceInput, { target: { value: '-100' } })
    
    expect(screen.getByText('Distance must be a positive whole number')).toBeInTheDocument()
  })

  it('calculates split time correctly', () => {
    renderWithChakra(<SplitConverter />)
    
    // Set 20 minutes for 5000m
    const minutesInput = screen.getByPlaceholderText('min')
    const distanceInput = screen.getByPlaceholderText('Enter distance')
    
    fireEvent.change(minutesInput, { target: { value: '20' } })
    fireEvent.change(distanceInput, { target: { value: '5000' } })
    
    // Expected split: 2:00 /500m
    expect(screen.getByText('500m Split: 2m')).toBeInTheDocument()
  })
})
