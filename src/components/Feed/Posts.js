import {Divider, Stack} from '@mui/material'
import {onSnapshot} from 'firebase/firestore'
import React, {lazy, useEffect, useState} from 'react'
import {maxWidth, Progress} from '../layout'
import {q, streamPosts} from './index'
const Post = lazy(() => import('./Post'))

const Posts = () => {
  const [posts, setPosts] = useState(null)

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(q, querySnapshot => {
  //     console.log(querySnapshot)
  //     const updatedPosts = querySnapshot.docs.map(docSnapshot => docSnapshot)
  //     // setPosts(updatedPosts)
  //   })
  //   return unsubscribe
  // }, [posts])

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

  console.log(posts)

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
