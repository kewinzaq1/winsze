import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {
  addDoc,
  collection,
  query,
  getDocs,
  orderBy,
  onSnapshot,
} from 'firebase/firestore'
import {db, storage} from '../../Auth'
import {FeedHeading} from './FeedHeading'
import {v4 as uuidv4} from 'uuid'
import React, {lazy, Suspense, useEffect, useMemo, useState} from 'react'
const Posts = lazy(() => import('./Posts'))

export const Feed = () => {
  return (
    <>
      <FeedHeading />
      <Suspense fallback={<div>Loading...</div>}>
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
