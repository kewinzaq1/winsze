import {screen, waitFor} from '@testing-library/react'
import {render} from '../../Utils/Tests'
import Post from '../../Components/Feed/Post'
import {Post as ModelPost} from '../../Utils/Models'

test('display post', async () => {
  const {
    avatar,
    date,
    description,
    photo,
    author,
    id,
    authorId,
    likes,
    usersWhoLiked,
    comments
  }: ModelPost = {
    avatar: undefined,
    date: `${new Date().toISOString()}`,
    description: 'fakeDesc',
    photo: undefined,
    author: 'fakeAuthor',
    id: 'fakeId',
    authorId: 'fakeAuthorId'
  }

  render({
    ui: (
      <Post
        key={id}
        avatar={avatar}
        date={date}
        description={description}
        photo={photo}
        author={author}
        id={id}
        authorId={authorId}
        likes={likes}
        usersWhoLiked={usersWhoLiked}
        comments={comments}
      />
    )
  })

  await waitFor(() => screen.findByText(/author/i))

  expect(screen.getByRole('link')).toHaveTextContent(`@${author}`)

  expect(
    screen.getByRole('heading', {name: /a few seconds ago/i, level: 6})
  ).toBeInTheDocument()

  expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(description)

  expect(
    screen.getByRole('button', {name: /open comments/i})
  ).toBeInTheDocument()

  expect(screen.getByLabelText(/comments counter/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/likes counter/i)).toBeInTheDocument()
})
