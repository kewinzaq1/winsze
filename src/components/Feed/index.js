/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {jsx, css} from '@emotion/react'
import {deleteObject, getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import {db, storage} from '../../Auth'
import {FeedHeading} from './FeedHeading'
import {v4 as uuidv4} from 'uuid'
import React, {lazy, Suspense} from 'react'
import {maxWidth, Progress} from '../Layout'
const Posts = lazy(() => import('./Posts'))

export const Feed = () => {
  return (
    <main
      css={css`
        max-width: ${maxWidth};
        margin: 0 auto;
        padding-bottom: 56px;
      `}
    >
      <FeedHeading />
      <Suspense key={'suspense-feed'} fallback={<Progress />}>
        <Posts />
      </Suspense>
    </main>
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
          authorId: user.uid,
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
      authorId: user.uid,
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

export const updatePost = async (
  id,
  {editPhotoFile, originalPhoto, isPhotoChanged, overrides} = {},
) => {
  if (editPhotoFile && isPhotoChanged) {
    const imageRef = ref(storage, `PostsPhotos/${id}`)
    return uploadBytes(imageRef, editPhotoFile).then(() => {
      getDownloadURL(imageRef).then(async photo => {
        await updateDoc(doc(db, 'posts', id), {
          ...overrides,
          photo: photo,
        })
      })
    })
  } else if (!originalPhoto && isPhotoChanged) {
    return await updateDoc(doc(db, 'posts', id), {
      ...overrides,
      photo: null,
    })
  } else if (originalPhoto && isPhotoChanged && !editPhotoFile) {
    return await updateDoc(doc(db, 'posts', id), {
      ...overrides,
      photo: null,
    })
  } else {
    return await updateDoc(doc(db, 'posts', id), {
      ...overrides,
    })
  }
}

export const toggleLike = async (id, {isLiked, userId} = {}) => {
  await updateDoc(doc(db, 'posts', id), {
    likes: increment(isLiked ? -1 : 1),
    usersWhoLiked: isLiked ? arrayRemove(userId) : arrayUnion(userId),
  })
}

export const addComment = async (postId, {user, content} = {}) => {
  await updateDoc(doc(db, 'posts', postId), {
    comments: arrayUnion(
      JSON.stringify({
        authorAvatar: user.photoURL,
        authorNickname: user.displayName,
        content: content,
        date: `${new Date().toISOString()}`,
        authorId: user.uid,
        id: uuidv4(),
      }),
    ),
  })
}

export const removeComment = async (
  postId,
  commentId,
  {user, comment} = {},
) => {
  await updateDoc(doc(db, 'posts', postId), {
    comments: arrayRemove(comment),
  })
}
