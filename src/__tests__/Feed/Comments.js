import {screen} from '@testing-library/react'
import {Comments} from '../../components/Feed/Comments/Comments'
import {buildUser} from '../../Utils/Builders'
import {renderLayout} from '../../Utils/tests'

const renderComments = (comments = null) =>
  renderLayout(<Comments comments={comments} open={true} />)

test('render comments without comment', () => {
  renderComments()

  expect(
    screen.getByRole('heading', {name: /write first comment/i}),
  ).toBeInTheDocument()
})

test('render comments', () => {
  const {username} = buildUser()

  const fakeComments = [
    JSON.stringify({
      authorAvatar: null,
      authorNickname: username,
      content: 'FAKE_CONTENT',
      date: `${new Date().toISOString()}`,
      authorId: 'FAKE_ID',
      id: 'FAKE_UUID',
    }),
  ]

  renderComments(fakeComments)

  expect(screen.getByRole('heading', {name: /1 comment/i})).toBeInTheDocument()

  expect(screen.getByText(username)).toBeInTheDocument()
  expect(screen.getByText(/a few seconds ago/i)).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/write a comment/i)).toBeInTheDocument()

  expect(screen.getByRole('button', {name: /add/i})).toBeInTheDocument()
})
