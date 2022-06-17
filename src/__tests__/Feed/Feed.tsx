import {screen, waitFor} from '@testing-library/react'
import {Comment} from '../../Components/Feed/Comments/Comment'
import {FeedHeading} from '../../Components/Feed/FeedHeading'
import Post from '../../Components/Feed/Post'
import {render} from '../../Utils/Tests'
import {buildUser} from '../../Utils/Builders/buildUser'

const user = buildUser()

test('render post', async () => {
  render({
    ui: (
      <Post
        author={user.username}
        authorId={'123'}
        date={`${new Date().toISOString()}`}
        description={'description'}
        id={'123'}
      />
    )
  })

  await waitFor(() => screen.getByText(/a few seconds ago/i))

  expect(
    screen.getByRole('heading', {name: /a few seconds ago/i, level: 6})
  ).toBeInTheDocument()
  expect(
    screen.getByText(`@${user.username}`, {selector: 'a'})
  ).toBeInTheDocument()

  expect(screen.getByRole('button', {name: /add like/i})).toBeInTheDocument()
  expect(
    screen.getByRole('button', {name: /open comments/i})
  ).toBeInTheDocument()
})

test('render comment', async () => {
  const fakeComment = JSON.stringify({
    authorAvatar: null,
    authorNickname: user.username,
    content: 'FAKE_CONTENT',
    date: `${new Date().toISOString()}`,
    authorId: 'FAKE_AUTHOR_ID',
    id: 'FAKE_UID'
  })

  render({ui: <Comment comment={fakeComment} postId={'123'} />})

  await waitFor(() => screen.getByText(user.username))

  expect(screen.getByText(user.username[0])).toBeInTheDocument()
  expect(screen.getByText(user.username)).toBeInTheDocument()
  expect(screen.getByText(/a few seconds ago/i)).toBeInTheDocument()
})

test('render feed heading', async () => {
  render({ui: <FeedHeading />, user})

  await waitFor(() => screen.getByRole('heading'))

  expect(
    screen.getByRole('heading', {name: /share with friends/i})
  ).toBeInTheDocument()
  expect(screen.getByRole('button', {name: /publish/i})).toBeInTheDocument()
})
