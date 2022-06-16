import {screen, waitFor} from '@testing-library/react'
import {SettingsProvider} from '../../Components/Settings'
import {Settings} from '../../Components/Settings'
import {render} from '../../Utils/Tests'
import userEvent from '@testing-library/user-event'

const renderSettings = () => {
  return render({
    ui: (
      <SettingsProvider>
        <Settings />
      </SettingsProvider>
    )
  })
}

test('render settings', async () => {
  renderSettings()

  await waitFor(() => screen.getByRole('heading', {name: /settings/i}))

  expect(screen.getByRole('heading', {name: /settings/i})).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {
      name: /personalize account for your preferences/i,
      level: 2
    })
  ).toBeInTheDocument()
  expect(
    screen.getByRole('heading', {
      name: /personalize account for your preferences/i,
      level: 2
    })
  ).toBeInTheDocument()

  expect(screen.getByText(/nickname/i, {selector: 'span'})).toBeInTheDocument()
  expect(screen.getByText(/set nickname/i, {selector: 'p'})).toBeInTheDocument()
  // @undefined yes this is ok, because my user doesn't exist

  expect(
    screen.getByText(/profile picture/i, {selector: 'span'})
  ).toBeInTheDocument()
  expect(
    screen.getByText(/update profile picture/i, {selector: 'p'})
  ).toBeInTheDocument()

  expect(screen.getByText(/password/i, {selector: 'span'})).toBeInTheDocument()
  expect(
    screen.getByText(/change your password/i, {selector: 'p'})
  ).toBeInTheDocument()

  expect(screen.getByText(/email/i, {selector: 'span'})).toBeInTheDocument()
  expect(
    screen.getByText(/send verification email/i, {selector: 'p'})
  ).toBeInTheDocument()

  expect(
    screen.getByText(/delete account/i, {selector: 'span'})
  ).toBeInTheDocument()
  expect(
    screen.getByText(/leave me forever/i, {selector: 'p'})
  ).toBeInTheDocument()
})

test('open confirmation modal', async () => {
  renderSettings()

  await userEvent.click(screen.getByText(/delete account/i, {selector: 'span'}))

  await waitFor(() => screen.getByRole('dialog'))

  expect(
    screen.getByText(/you want to delete account/i, {selector: 'h2'})
  ).toBeInTheDocument()
  expect(
    screen.getByText(
      /this is an irreversible process, all data will be lost/i,
      {selector: 'p'}
    )
  ).toBeInTheDocument()
})

test('open form modal', async () => {
  renderSettings()

  await userEvent.click(
    screen.getByText(/profile picture/i, {selector: 'span'})
  )
  expect(screen.getByRole('dialog')).toBeInTheDocument()
  expect(screen.getByRole('button')).toBeInTheDocument()

  await userEvent.click(screen.getByText(/password/i, {selector: 'span'}))
  expect(screen.getByRole('dialog')).toBeInTheDocument()
  expect(screen.getByRole('button')).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()

  await userEvent.click(screen.getByText(/nickname/i, {selector: 'span'}))
  expect(screen.getByRole('dialog')).toBeInTheDocument()
  expect(screen.getByRole('button')).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/nickname/i)).toBeInTheDocument()
})
