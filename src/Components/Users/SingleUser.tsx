/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import * as React from 'react'
import {css} from '@emotion/react'
import {Avatar, Divider, Stack, Typography} from '@mui/material'
import {useParams} from 'react-router-dom'
import {streamFriends} from '.'
import {useAuth} from '../../Auth'
import {streamPosts} from '../Feed'
import {FeedHeading} from '../Feed/FeedHeading'
import Post from '../Feed/Post'
import PersonIcon from '@mui/icons-material/Person'
import {Progress} from '../Layout/Progress'
import {
  maxWidth,
  mobileBreakpoint,
  myBlue,
  styleFlexColumn,
  tabletBreakpoint
} from '../Layout/LayoutStyles'
import {useStream} from '../../Utils/Hooks/Shared/useStream'
import {Post as PostModel} from '../../Utils/Models/Feed/Post.model'
import {User} from '../../Utils/Models/User/User.model'

const SingleUser = () => {
  const {user: fireAuthUser} = useAuth()
  const users: User[] = useStream(streamFriends)
  const posts: PostModel[] = useStream(streamPosts)

  const {id} = useParams()
  const user = users?.find(user => user.id === id)
  const filteredPosts = posts?.filter(post => post.authorId === id)

  if (!user) {
    return <Progress />
  }

  return (
    <>
      <main
        css={css`
          word-break: break-word;
          @media (max-width: ${mobileBreakpoint}) {
            ${styleFlexColumn}
          }

          @media (min-width: ${mobileBreakpoint}) {
            margin: 0 auto;
            width: 100%;
            max-width: ${maxWidth};
            padding: 2rem 1rem 1rem 1rem;
            gap: 0.5rem;
            display: grid;
            justify-items: end;
            align-items: center;
            grid-template-columns: 20% 80%;
          }
        `}
      >
        <Avatar
          src={user?.avatar}
          alt={user?.nickname}
          variant="rounded"
          css={css`
            width: 100%;
            height: 150px;
            grid-row: span 2;
            @media (min-width: ${tabletBreakpoint}) {
              grid-column: 1;
            }
            background-color: ${myBlue};

            svg {
              font-size: 5rem;
            }
          `}
          color={user?.avatar && 'primary'}
        >
          {!user?.avatar && <PersonIcon />}
        </Avatar>
        <Typography
          variant="h2"
          component="h1"
          css={css`
            grid-column: 2;
          `}
        >
          {user?.nickname}
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          css={css`
            grid-column: 2;
          `}
        >
          {id === fireAuthUser?.uid
            ? 'Check or write own posts'
            : `Check ${user?.nickname} posts`}
        </Typography>
      </main>
      {id !== fireAuthUser?.uid && (
        <Divider
          css={css`
            margin: 0 auto;
            max-width: ${maxWidth};
          `}
        />
      )}

      <section
        css={css`
          margin: 0 auto;
          max-width: ${maxWidth};
          padding-bottom: 56px;
        `}
      >
        {id === fireAuthUser?.uid && <FeedHeading disableTitle />}

        {Boolean(filteredPosts) && (
          <Stack>
            {filteredPosts.map(
              ({
                author,
                avatar,
                date,
                description,
                photo,
                id,
                authorId,
                likes,
                usersWhoLiked,
                comments
              }) => (
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
            )}
          </Stack>
        )}
      </section>
    </>
  )
}
export default SingleUser
