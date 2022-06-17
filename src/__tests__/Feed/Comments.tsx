import {screen, waitFor} from '@testing-library/react'
import {Comments} from '../../Components/Feed/Comments/Comments'
import {render} from '../../Utils/Tests'
import {buildUser} from '../../Utils/Builders/buildUser'

const {username} = buildUser()

const fakeComments = [
  JSON.stringify({
    authorAvatar: null,
    authorNickname: username,
    content: 'FAKE_CONTENT',
    date: `${new Date().toISOString()}`,
    authorId: 'FAKE_ID',
    id: 'FAKE_UUID'
  })
]

const renderComments = (comments?: string[], open = true, postId = '123') =>
  render({
    ui: (
      <Comments comments={comments ?? undefined} open={true} postId={postId} />
    )
  })

test('render comments without comment', async () => {
  renderComments()

  await waitFor(() => screen.getByRole('dialog'))

  expect(
    screen.getByRole('heading', {name: /write first comment/i})
  ).toBeInTheDocument()
})

test('render comments', async () => {
  renderComments(fakeComments)

  await waitFor(() => screen.getByRole('dialog'))

  expect(screen.getByRole('heading', {name: /1 comment/i})).toBeInTheDocument()

  expect(screen.getByText(username)).toBeInTheDocument()
  expect(screen.getByText(/a few seconds ago/i)).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/write a comment/i)).toBeInTheDocument()

  expect(screen.getByRole('button', {name: /add/i})).toBeInTheDocument()
})
