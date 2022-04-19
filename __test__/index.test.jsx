import { render, screen } from '@testing-library/react'
import Layout from '../components/layout'
import '@testing-library/jest-dom'

describe('Layout', () => {

  test('renders a heading', () => {
    render(<Layout />)
    const heading = screen.getByText('welcome to next.js!', {})
    expect(heading).toBeInTheDocument()
  })
});
