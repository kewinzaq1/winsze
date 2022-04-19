import {Stack} from '@mui/material'
import React, {lazy} from 'react'
import {useStream} from '../../Utils/hooks'
import {Post as PostModel} from '../../Utils/models'
import {Progress} from '../Layout'
import {streamPosts} from './index'
const Post = lazy(() => import('./Post'))

const Posts = () => {
  const posts = useStream(streamPosts)

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
          photo,
          id,
          authorId,
          likes,
          usersWhoLiked,
          comments,
        }: PostModel) => (
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
  )
}

export default Posts
