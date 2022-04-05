import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from '../../Auth'
import {Navbar} from '../../components/layout/Navbar'
import App from '../../App'
import {buildUser} from '../../Utils/Builders'

jest.fn('firebase')
jest.fn('firebase/auth')
jest.fn('firebase/app')

const renderLoginScreen = () => {
  const Wrapper = ({children}) => (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        {children}
      </AuthProvider>
    </BrowserRouter>
  )
  render(<App />, {wrapper: Wrapper})
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

const renderRegisterScreen = () => {
  const {emailInput, passwordInput, registerButton} = renderLoginScreen()
  fireEvent.click(registerButton)
  const usernameInput = screen.getByLabelText(/nickname/i)
  const sendForm = screen.getByRole('button', {name: /register/i})

  return {
    emailInput,
    passwordInput,
    sendForm,
    usernameInput,
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

describe('integration with firebase', () => {
  test('login as user', async () => {
    const {emailInput, passwordInput, loginButton} = renderLoginScreen()

    fireEvent.change(emailInput, {
      target: {value: 'test@winsze.pl'},
    })
    fireEvent.change(passwordInput, {target: {value: 'test1234'}})
    fireEvent.click(loginButton)

    await screen.findByRole('progressbar')
    await waitForElementToBeRemoved(screen.queryByRole('progressbar'))

    expect(screen.getByText(/authenticated/i)).toBeInTheDocument()
  })

  // test('register new user', async () => {
  //   const {username, email, password} = buildUser()
  //   const {emailInput, usernameInput, passwordInput, sendForm} =
  //     renderRegisterScreen()

  //   fireEvent.change(emailInput, {target: {value: email}})
  //   fireEvent.change(usernameInput, {
  //     target: {value: username},
  //   })
  //   fireEvent.change(passwordInput, {target: {value: password}})
  //   fireEvent.click(sendForm)

  //   await screen.findByRole('progressbar')
  //   await waitForElementToBeRemoved(screen.queryByRole('progressbar'))

  //   expect(screen.getByText(/authenticated/i)).toBeInTheDocument()
  // })
})
