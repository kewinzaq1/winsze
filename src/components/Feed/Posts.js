import {Divider, Stack} from '@mui/material'
import React, {lazy, useEffect, useState} from 'react'
import {maxWidth, Progress} from '../layout'
import {streamPosts} from './index'
const Post = lazy(() => import('./Post'))

const Posts = () => {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    const unsubscribe = streamPosts(
      querySnapshot => {
        const updatedPosts = querySnapshot.docs.map(docSnapshot =>
          docSnapshot.data(),
        )
        setPosts(updatedPosts)
      },
      error => console.error(error.message),
    )
    return unsubscribe
  }, [])

  if (!posts) {
    return <Progress />
  }

  return (
    <Stack divider={<Divider />} maxWidth={maxWidth}>
      {posts.map(({author, avatar, date, description, photo, id}) => (
        <Post
          key={id}
          avatar={avatar}
          date={date}
          description={description}
          photo={photo}
          author={author}
          id={id}
        />
      ))}
    </Stack>
  )
}

export default Posts
