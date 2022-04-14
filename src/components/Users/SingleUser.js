/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {css, jsx} from '@emotion/react'
import {Avatar, Divider, Stack, Typography} from '@mui/material'
import React from 'react'
import {useParams} from 'react-router-dom'
import {streamFriends} from '.'
import {useAuth} from '../../Auth'
import {useStream} from '../../Utils/hooks'
import {streamPosts} from '../Feed'
import {FeedHeading} from '../Feed/FeedHeading'
import Post from '../Feed/Post'
import {
  maxWidth,
  mobileBreakpoint,
  styleFlexColumn,
  tabletBreakpoint,
} from '../Layout'

const SingleUser = () => {
  const {
    user: {uid: currentUserId},
  } = useAuth()
  const {streamData: users} = useStream(streamFriends)
  const {streamData: posts} = useStream(streamPosts)

  let {id} = useParams()
  const user = users?.find(user => user.id === id)
  const filteredPosts = posts?.filter(post => post.authorId === id)

  if (!user) {
    return
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
        {user?.avatar && (
          <Avatar
            src={user?.avatar}
            alt={user?.displayName}
            variant="rounded"
            css={css`
              width: 100%;
              height: 150px;
              grid-row: span 2;
              @media (min-width: ${tabletBreakpoint}) {
                grid-column: 1;
              }
            `}
          ></Avatar>
        )}
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
          {id === currentUserId
            ? 'Check or write own posts'
            : `Check ${user?.nickname} posts`}
        </Typography>
      </main>
      {id !== currentUserId && (
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
        {id === currentUserId && <FeedHeading disableTitle />}

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
                comments,
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
              ),
            )}
          </Stack>
        )}
      </section>
    </>
  )
}
export default SingleUser
