import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import {Navbar} from '../../components/layout/Navbar'
import {AuthProvider, useAuth} from '../../Auth'
import {renderHook, cleanup, act} from '@testing-library/react-hooks'

test('render navbar', () => {
  render(<Navbar />, {wrapper: AuthProvider})

  expect(screen.getByRole('heading')).toHaveTextContent('winsze')
  expect(screen.getByRole('button', {name: /sign up/i})).toBeInTheDocument()

  screen.debug()
})

test('render navbar with fake user', () => {
  const {
    result: {current},
  } = renderHook(() => useAuth(), {wrapper: AuthProvider})

  act(() => {
    current.setUser({})
  })

  console.log(current)
})
