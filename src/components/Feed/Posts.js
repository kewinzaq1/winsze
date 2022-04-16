import {Stack} from '@mui/material'
import React, {lazy} from 'react'
import {useStream} from '../../Utils/hooks'
import {Progress} from '../Layout'
import {streamPosts} from './index'
const Post = lazy(() => import('./Post'))

const Posts = () => {
  const {streamData: posts} = useStream(streamPosts)

  if (!posts) {
    return <Progress />
  }

  return (
    <Stack>
      {posts.map(
        ({
          author,
          avatar,
          date,
          description,
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
  )
}

export default Posts
