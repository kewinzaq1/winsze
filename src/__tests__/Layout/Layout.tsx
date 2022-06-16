import {screen, waitFor} from '@testing-library/react'
import {Navbar} from '../../Components/Layout/Navbar/Navbar'
import {Footer} from '../../Components/Layout/Footer'
import {render} from '../../Utils/Tests'
import {User} from 'firebase/auth'

test('render navbar', async () => {
  render({ui: <Navbar />})
  await waitFor(() => screen.getByRole('heading'))

  expect(screen.getByRole('heading')).toHaveTextContent('winsze')
  expect(screen.getByRole('button', {name: /sign up/i})).toBeInTheDocument()
})

test('render footer', () => {
  const user: Partial<User> = {
    displayName: '',
    email: '',
    emailVerified: false,
    isAnonymous: false,
    phoneNumber: '',
    photoURL: '',
    providerData: [],
    providerId: '',
    refreshToken: '',
    tenantId: '',
    uid: ''
  }

  render({ui: <Footer />, user: user})
  waitFor(() => screen.getByLabelText(/go to feed/i))

  expect(screen.getByRole('button', {name: /users/i})).toBeInTheDocument()
  expect(screen.getByRole('button', {name: /you/i})).toBeInTheDocument()
  expect(screen.getByRole('button', {name: /feed/i})).toBeInTheDocument()
  expect(screen.getByRole('button', {name: /settings/i})).toBeInTheDocument()
})
