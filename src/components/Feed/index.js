/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {jsx, css} from '@emotion/react'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {addDoc, collection, query, orderBy} from 'firebase/firestore'
import {db, storage} from '../../Auth'
import {FeedHeading} from './FeedHeading'
import {v4 as uuidv4} from 'uuid'
import React, {lazy, Suspense} from 'react'
import {Progress} from '../layout'
const Posts = lazy(() => import('./Posts'))

export const Feed = () => {
  return (
    <>
      <FeedHeading />
      <Suspense
        key={'suspense-feed'}
        fallback={<Progress variant="rectangular" animation="wave" />}
      >
        <Posts />
      </Suspense>
    </>
  )
}

export const uploadPost = async (user, desc, photo) => {
  if (photo) {
    const imageRef = ref(storage, `PostsPhotos/${uuidv4()}`)
    return uploadBytes(imageRef, photo).then(() => {
      getDownloadURL(imageRef).then(async photoURL => {
        await addDoc(collection(db, 'posts'), {
          author: user.displayName,
          avatar: user.photoURL,
          date: `${new Date().toISOString()}`,
          description: desc,
          photo: photoURL,
          id: Date.now(),
        })
      })
    })
  } else
    return await addDoc(collection(db, 'posts'), {
      author: user.displayName,
      avatar: user.photoURL,
      date: `${new Date().toISOString()}`,
      description: desc,
      id: uuidv4(),
    })
}

const postsRef = collection(db, 'posts')
export const q = query(postsRef, orderBy('date', 'desc'))
