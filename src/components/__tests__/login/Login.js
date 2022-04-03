import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from '../../../Auth'
import {Navbar} from '../../layout/Navbar'
import App from '../../../App'
import {buildUser} from '../../../Utils/Builders'

jest.fn('firebase/auth')
jest.fn('firebase')
jest.fn('firebase/app')

function renderLoginScreen() {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <App />
      </AuthProvider>
    </BrowserRouter>,
  )
  const emailInput = screen.getByLabelText(/email/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const loginButton = screen.getByRole('button', {name: /login/i})
  const registerButton = screen.getByRole('button', {name: /sign up/i})

  return {
    emailInput,
    passwordInput,
    loginButton,
    registerButton,
  }
}

describe('unauth app', () => {
  test('display login page', () => {
    const {emailInput, passwordInput, loginButton, registerButton} =
      renderLoginScreen()
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
    const {emailInput, passwordInput, loginButton, registerButton} =
      renderLoginScreen()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
    fireEvent.click(registerButton)
    expect(screen.getByText('Nice to Meet You')).toBeInTheDocument()
    expect(
      screen.getByText('First time? Create Free Account Now. Its 100% free'),
    ).toBeInTheDocument()
  })
})

describe('auth successful', () => {
  const {username, email, password} = buildUser()

  test('register new user', async () => {
    const {emailInput, passwordInput, registerButton} = renderLoginScreen()
    fireEvent.click(registerButton)
    const registerFormBtn = screen.getByRole('button', {name: /register/i})

    fireEvent.change(emailInput, {target: {value: email}})
    fireEvent.change(screen.getByLabelText(/nickname/i), {
      target: {value: username},
    })
    fireEvent.change(passwordInput, {target: {value: password}})

    fireEvent.click(registerFormBtn)

    await screen.findByRole('progressbar')

    // eslint-disable-next-line testing-library/prefer-query-by-disappearance
    await waitForElementToBeRemoved(screen.getByRole('progressbar'))

    expect(screen.getByText(/authenticated/i)).toBeInTheDocument()
  })
  test('login as user', async () => {
    const {emailInput, passwordInput, loginButton} = renderLoginScreen()

    fireEvent.change(emailInput, {target: {value: email}})
    fireEvent.change(passwordInput, {target: {value: password}})
    fireEvent.click(loginButton)

    await screen.findByRole('progressbar')
    // eslint-disable-next-line testing-library/prefer-query-by-disappearance
    await waitForElementToBeRemoved(screen.getByRole('progressbar'))

    expect(screen.getByText(/authenticated/i)).toBeInTheDocument()
  })
})
