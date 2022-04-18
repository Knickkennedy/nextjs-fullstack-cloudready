import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {

  test('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('main', {
      name: '',
    })

    expect(heading).toBeInTheDocument()
  })
});
