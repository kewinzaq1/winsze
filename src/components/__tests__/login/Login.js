import {render, screen, fireEvent, act} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from '../../../Auth'
import userEvent from '@testing-library/user-event'
import {Navbar} from '../../layout/Navbar'
import {UnAuthenticatedApp} from './../../UnAuthenticated'

function renderLoginScreen() {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <UnAuthenticatedApp />
      </AuthProvider>
    </BrowserRouter>,
  )
}

test('display login page', () => {
  renderLoginScreen()

  const emailInput = screen.getByLabelText(/email/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const loginButton = screen.getByRole('button', {name: /login/i})
  const registerButton = screen.getByRole('button', {name: /sign up/i})

  expect(emailInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
  expect(loginButton).toBeInTheDocument()
  expect(registerButton).toBeInTheDocument()
  expect(screen.getByText('Welcome back')).toBeInTheDocument()
  expect(
    screen.getByText('Nice that you are still with us'),
  ).toBeInTheDocument()
})
test('display register page', () => {
  renderLoginScreen()
  const emailInput = screen.getByLabelText(/email/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const loginButton = screen.getByRole('button', {name: /login/i})
  const registerButton = screen.getByRole('button', {name: /sign up/i})
  expect(emailInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
  expect(loginButton).toBeInTheDocument()
  fireEvent.click(registerButton)
  expect(screen.getByText('Nice to Meet You')).toBeInTheDocument()
  expect(
    screen.getByText('First time? Create Free Account Now. Its 100% free'),
  ).toBeInTheDocument()
})
