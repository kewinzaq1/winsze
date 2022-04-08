import {Divider, Stack} from '@mui/material'
import {onSnapshot} from 'firebase/firestore'
import React, {lazy, useEffect, useState} from 'react'
import {maxWidth} from '../layout'
import {q} from './index'
const Post = lazy(() => import('./Post'))

const Posts = () => {
  const [posts, setPosts] = useState(null)

  const unsubscribe = onSnapshot(q, querySnapshot => {
    const cities = []
    querySnapshot.forEach(doc => {
      cities.push(doc.data())
    })
    setPosts(cities)
  })

  useEffect(() => {
    return () => unsubscribe()
  }, [unsubscribe])

  if (!posts) {
    return
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
        />
      ))}
    </Stack>
  )
}

export default Posts
