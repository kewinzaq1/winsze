import * as React from 'react'
import {Stack} from '@mui/material'
import {streamPosts} from './index'
import {Progress} from '../Layout/Progress'
import {useStream} from '../../Utils/Hooks/Shared/useStream'
import {Post as PostModel} from '../../Utils/Models/Feed/Post.model'
const Post = React.lazy(() => import('./Post'))

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
          comments
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
        )
      )}
    </Stack>
  )
}

export default Posts
