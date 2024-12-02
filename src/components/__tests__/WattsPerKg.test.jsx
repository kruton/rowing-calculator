import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import WattsPerKg from '../WattsPerKg'

describe('WattsPerKg', () => {
  const renderWithChakra = (component) => {
    return render(
      <ChakraProvider>
        {component}
      </ChakraProvider>
    )
  }

  // Helper function to check if a string represents a number close to the expected value
  const matchesApproximately = (resultText, expectedValue) => {
    const number = parseFloat(resultText)
    return Math.abs(number - expectedValue) < 0.02 // Allow for small floating point differences
  }

  it('renders all input fields and unit selector', () => {
    renderWithChakra(<WattsPerKg />)

    expect(screen.getByPlaceholderText('Enter watts')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter weight')).toBeInTheDocument()
    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(select).toHaveValue('kg')
  })

  it('prevents invalid power input', () => {
    renderWithChakra(<WattsPerKg />)

    const wattsInput = screen.getByPlaceholderText('Enter watts')

    // Try to enter negative watts
    fireEvent.change(wattsInput, { target: { value: '-1' } })
    expect(screen.queryByText(/result/i)).not.toBeInTheDocument()
  })

  it('prevents invalid weight input', () => {
    renderWithChakra(<WattsPerKg />)

    const weightInput = screen.getByPlaceholderText('Enter weight')

    // Try to enter negative weight
    fireEvent.change(weightInput, { target: { value: '-1' } })
    expect(screen.queryByText(/result/i)).not.toBeInTheDocument()

    // Try to enter zero weight
    fireEvent.change(weightInput, { target: { value: '0' } })
    expect(screen.queryByText(/result/i)).not.toBeInTheDocument()
  })

  it('calculates watts per kg correctly with kg input', async () => {
    renderWithChakra(<WattsPerKg />)

    const wattsInput = screen.getByPlaceholderText('Enter watts')
    const weightInput = screen.getByPlaceholderText('Enter weight')

    // 300 watts / 75 kg ≈ 4 W/kg
    fireEvent.change(wattsInput, { target: { value: '300' } })
    fireEvent.change(weightInput, { target: { value: '75' } })

    await waitFor(() => {
      const result = screen.getByText(/result/i, { exact: false })
      const resultText = result.textContent.match(/[\d.]+/)[0]
      expect(matchesApproximately(resultText, 4.00)).toBe(true)
    })
  })

  it('calculates watts per kg correctly with lbs input', async () => {
    renderWithChakra(<WattsPerKg />)

    const wattsInput = screen.getByPlaceholderText('Enter watts')
    const weightInput = screen.getByPlaceholderText('Enter weight')
    const unitSelect = screen.getByRole('combobox')

    // Change unit to lbs
    fireEvent.change(unitSelect, { target: { value: 'lbs' } })

    // 300 watts / (165 lbs * 0.45359237) ≈ 4 W/kg
    fireEvent.change(wattsInput, { target: { value: '300' } })
    fireEvent.change(weightInput, { target: { value: '165' } })

    await waitFor(() => {
      const result = screen.getByText(/result/i, { exact: false })
      const resultText = result.textContent.match(/[\d.]+/)[0]
      expect(matchesApproximately(resultText, 4.00)).toBe(true)
    })
  })

  it('updates calculation when unit is changed', async () => {
    renderWithChakra(<WattsPerKg />)

    const wattsInput = screen.getByPlaceholderText('Enter watts')
    const weightInput = screen.getByPlaceholderText('Enter weight')
    const unitSelect = screen.getByRole('combobox')

    // First enter values in kg
    fireEvent.change(wattsInput, { target: { value: '300' } })
    fireEvent.change(weightInput, { target: { value: '75' } })

    await waitFor(() => {
      const result = screen.getByText(/result/i, { exact: false })
      const resultText = result.textContent.match(/[\d.]+/)[0]
      expect(matchesApproximately(resultText, 4.00)).toBe(true)
    })

    // Change to lbs - the result should update since the weight input
    // value is now interpreted as lbs
    fireEvent.change(unitSelect, { target: { value: 'lbs' } })

    await waitFor(() => {
      const result = screen.getByText(/result/i, { exact: false })
      const resultText = result.textContent.match(/[\d.]+/)[0]
      expect(matchesApproximately(resultText, 8.82)).toBe(true)
    })
  })
})
