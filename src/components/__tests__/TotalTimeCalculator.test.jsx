import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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

    expect(screen.getByPlaceholderText('min')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('sec')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter distance')).toBeInTheDocument()
  })

  it('prevents invalid time input', () => {
    renderWithChakra(<TotalTimeCalculator />)

    const minutesInput = screen.getByPlaceholderText('min')
    const secondsInput = screen.getByPlaceholderText('sec')

    // Try to enter 60 in minutes
    fireEvent.change(minutesInput, { target: { value: '60' } })
    expect(minutesInput.value).toBe('')

    // Try to enter 60 in seconds
    fireEvent.change(secondsInput, { target: { value: '60' } })
    expect(secondsInput.value).toBe('')

    // Try to enter negative numbers
    fireEvent.change(minutesInput, { target: { value: '-1' } })
    expect(minutesInput.value).toBe('')

    fireEvent.change(secondsInput, { target: { value: '-1' } })
    expect(secondsInput.value).toBe('')
  })

  it('calculates total time correctly', async () => {
    renderWithChakra(<TotalTimeCalculator />)

    // Set a 2:00 split time for 2000m
    const minutesInput = screen.getByPlaceholderText('min')
    const secondsInput = screen.getByPlaceholderText('sec')
    const distanceInput = screen.getByPlaceholderText('Enter distance')

    fireEvent.change(minutesInput, { target: { value: '2' } })
    fireEvent.change(secondsInput, { target: { value: '0' } })
    fireEvent.change(distanceInput, { target: { value: '2000' } })

    // For a 2:00 split over 2000m, total time should be 8:00
    await waitFor(() => {
      const result = screen.getByText('Total Time:', { exact: false })
      expect(result).toHaveTextContent('8m 0s')
    })
  })
})
