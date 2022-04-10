/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {jsx, css} from '@emotion/react'
import {deleteObject, getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore'
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
      <Suspense key={'suspense-feed'} fallback={<Progress />}>
        <Posts />
      </Suspense>
    </>
  )
}

export const uploadPost = async (user, desc, photo) => {
  const postUid = uuidv4()
  if (photo) {
    const imageRef = ref(storage, `PostsPhotos/${postUid}`)
    return uploadBytes(imageRef, photo).then(() => {
      getDownloadURL(imageRef).then(async photoURL => {
        await setDoc(doc(db, 'posts', postUid), {
          author: user.displayName ?? user.email.split('@')[0],
          avatar: user.photoURL,
          date: `${new Date().toISOString()}`,
          description: desc,
          photo: photoURL,
          id: postUid,
        })
      })
    })
  } else
    return await setDoc(doc(db, 'posts', postUid), {
      author: user.displayName ?? user.email.split('@')[0],
      avatar: user.photoURL,
      date: `${new Date().toISOString()}`,
      description: desc,
      id: postUid,
    })
}

const postsRef = collection(db, 'posts')
export const q = query(postsRef, orderBy('date', 'desc'))

export const streamPosts = (snapshot, error) => {
  const itemsColRef = collection(db, 'posts')
  const itemsQuery = query(itemsColRef, orderBy('date', 'desc'))
  return onSnapshot(itemsQuery, snapshot, error)
}

export const removePost = async (id, photo) => {
  await deleteDoc(doc(db, 'posts', id))
  if (photo) {
    await deleteObject(ref(storage, `PostPhotos/${id}`))
  }
}

export const updatePost = async (id, {editPhoto, overrides} = {}) => {
  if (editPhoto) {
    const imageRef = ref(storage, `PostsPhotos/${id}`)
    return uploadBytes(imageRef, editPhoto).then(() => {
      getDownloadURL(imageRef).then(async photo => {
        await updateDoc(doc(db, 'posts', id), {
          ...overrides,
          photo: photo,
        })
      })
    })
  } else
    return await updateDoc(doc(db, 'posts', id), {
      ...overrides,
      photo: null,
    })
}
