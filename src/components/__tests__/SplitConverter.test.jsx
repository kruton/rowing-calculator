import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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

  it('prevents invalid time input', () => {
    renderWithChakra(<SplitConverter />)

    const hoursInput = screen.getByPlaceholderText('hr')
    const minutesInput = screen.getByPlaceholderText('min')
    const secondsInput = screen.getByPlaceholderText('sec')

    // Try to enter 60 in minutes
    fireEvent.change(minutesInput, { target: { value: '60' } })
    expect(minutesInput.value).toBe('')

    // Try to enter 60 in seconds
    fireEvent.change(secondsInput, { target: { value: '60' } })
    expect(secondsInput.value).toBe('')

    // Try to enter negative numbers
    fireEvent.change(hoursInput, { target: { value: '-1' } })
    expect(hoursInput.value).toBe('')

    fireEvent.change(minutesInput, { target: { value: '-1' } })
    expect(minutesInput.value).toBe('')

    fireEvent.change(secondsInput, { target: { value: '-1' } })
    expect(secondsInput.value).toBe('')
  })

  it('calculates split time correctly', async () => {
    renderWithChakra(<SplitConverter />)

    // Set 8:00 total time for 2000m
    const hoursInput = screen.getByPlaceholderText('hr')
    const minutesInput = screen.getByPlaceholderText('min')
    const secondsInput = screen.getByPlaceholderText('sec')
    const distanceInput = screen.getByPlaceholderText('Enter distance')

    fireEvent.change(hoursInput, { target: { value: '0' } })
    fireEvent.change(minutesInput, { target: { value: '8' } })
    fireEvent.change(secondsInput, { target: { value: '0' } })
    fireEvent.change(distanceInput, { target: { value: '2000' } })

    // For 8:00 over 2000m, split should be 2:00
    await waitFor(() => {
      const result = screen.getByText('500m Split:', { exact: false })
      expect(result).toHaveTextContent('2m 0s')
    })
  })
})
