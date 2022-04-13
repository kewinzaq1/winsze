/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {css, jsx} from '@emotion/react'
import {Avatar, Card, Divider, Stack, Typography} from '@mui/material'
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

export const SingleUser = () => {
  const {
    user: {uid: currentUserId},
  } = useAuth()
  const {streamData: users} = useStream(streamFriends)
  const {streamData: posts} = useStream(streamPosts)

  let {id} = useParams()
  console.log('id', id)
  const user = users?.find(user => user.id === id)
  const filteredPosts = posts?.filter(post => post.authorId === id)
  console.log('user', user)
  console.log('filteredPosts', filteredPosts)

  if (!user) {
    return null
  }

  return (
    <>
      <main
        css={css`
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
            word-break: break-all;
          }

          /* @media (min-width: ${mobileBreakpoint}) {
            grid-template-columns: 10% 90%;
          } */
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
              /* img {
                object-fit: contain;
              } */
            `}
          ></Avatar>
        )}
        <Typography
          variant="h2"
          component="h1"
          css={css`
            /* @media (min-width: ${mobileBreakpoint}) {
              grid-column: 2;
            }

            /* @media (max-width: ${mobileBreakpoint}) {
              grid-column: 1;
            } */ */
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
          Check out {id === currentUserId ? 'own' : user?.nickname} posts
        </Typography>
      </main>

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
    </>
  )
}
