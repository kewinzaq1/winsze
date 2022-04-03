import {render, screen} from '@testing-library/react'
import {Navbar} from '../../components/layout/Navbar'
import {AuthProvider} from '../../Auth'

const renderNavbar = user => {
  const Wrapper = ({children}) => <AuthProvider>{children}</AuthProvider>

  return render(<Navbar />, {wrapper: Wrapper})
}

test('render navbar', () => {
  renderNavbar()

  expect(screen.getByRole('heading')).toHaveTextContent('winsze')
  expect(screen.getByRole('button', {name: /sign up/i})).toBeInTheDocument()
})
