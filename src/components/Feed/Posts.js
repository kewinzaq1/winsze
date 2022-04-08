import {onSnapshot} from 'firebase/firestore'
import React, {useEffect, useState} from 'react'
import {q} from './index'
import {Post} from './Post'

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

  return posts.map(({author, avatar, date, description, photo, id}) => {
    return (
      <Post
        key={id}
        avatar={avatar}
        date={date}
        description={description}
        photo={photo}
      />
    )
  })
}

export default Posts
