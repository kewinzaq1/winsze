/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import {css} from '@emotion/react'
import {deleteObject, getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    DocumentData,
    FirestoreError,
    increment,
    onSnapshot,
    orderBy,
    query,
    QuerySnapshot,
    setDoc,
    SnapshotListenOptions,
    updateDoc
} from 'firebase/firestore'
import {FeedHeading} from './FeedHeading'
import {v4 as uuidv4} from 'uuid'
import React from 'react'
import {Progress} from '../Layout/Progress'
import {maxWidth} from '../../Utils/Layout'
import {db, storage} from "../../Firebase";
import {UpdatePost} from "../../Utils/Models/Feed/UpdatePost.model";
import {UploadPost} from "../../Utils/Models/Feed/UploadPost.model";
import {ToggleLike} from "../../Utils/Models/Feed/ToggleLike.model";
import {AddComment} from "../../Utils/Models/Feed/AddComment.model";
import {RemoveComment} from "../../Utils/Models/Feed/RemoveComment.model";
const Posts = React.lazy(() => import('./Posts'))


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
      <React.Suspense key={'suspense-feed'} fallback={<Progress />}>
        <Posts />
      </React.Suspense>
    </main>
  )
}

export const uploadPost = async ({user, desc, photo}: UploadPost) => {
  const postUid = uuidv4()

  if (photo) {
    const imageRef = ref(storage, `PostsPhotos/${postUid}`)
    return uploadBytes(imageRef, photo).then(() => {
      getDownloadURL(imageRef).then(async photoURL => {
        await setDoc(doc(db, 'posts', postUid), {
          author: user.displayName ?? user.email?.split('@')[0],
          avatar: user.photoURL,
          date: `${new Date().toISOString()}`,
          description: desc,
          photo: photoURL,
          id: postUid,
          authorId: user.uid
        })
      })
    })
  } else
    return await setDoc(doc(db, 'posts', postUid), {
      author: user.displayName ?? user.email?.split('@')[0],
      avatar: user.photoURL,
      date: `${new Date().toISOString()}`,
      description: desc,
      id: postUid,
      authorId: user.uid
    })
}

const postsRef = collection(db, 'posts')
export const q = query(postsRef, orderBy('date', 'desc'))

export const streamPosts = (
  snapshot: SnapshotListenOptions,
  error: {
    next?: (snapshot: QuerySnapshot<DocumentData>) => void
    error?: (error: FirestoreError) => void
    complete?: () => void
  }
) => {
  const itemsColRef = collection(db, 'posts')
  const itemsQuery = query(itemsColRef, orderBy('date', 'desc'))
  return onSnapshot(itemsQuery, snapshot, error)
}

export const removePost = async (id: string, photo: string | undefined) => {
  await deleteDoc(doc(db, 'posts', id))
  if (photo) {
    await deleteObject(ref(storage, `PostsPhotos/${id}`))
  }
}

export const updatePost = async ({
  id,
  editPhotoFile,
  originalPhoto,
  isPhotoChanged,
  overwrites
}: UpdatePost) => {
  if (editPhotoFile && isPhotoChanged) {
    const imageRef = ref(storage, `PostsPhotos/${id}`)
    return uploadBytes(imageRef, editPhotoFile).then(() => {
      getDownloadURL(imageRef).then(async photo => {
        await updateDoc(doc(db, 'posts', id), {
          ...overwrites,
          photo: photo
        })
      })
    })
  } else if (!originalPhoto && isPhotoChanged) {
    return await updateDoc(doc(db, 'posts', id), {
      ...overwrites,
      photo: null
    })
  } else if (originalPhoto && isPhotoChanged && !editPhotoFile) {
    return await updateDoc(doc(db, 'posts', id), {
      ...overwrites,
      photo: null
    })
  } else {
    return await updateDoc(doc(db, 'posts', id), {
      ...overwrites
    })
  }
}

export const toggleLike = async ({id, isLiked, userId}: ToggleLike) => {
  await updateDoc(doc(db, 'posts', id), {
    likes: increment(isLiked ? -1 : 1),
    usersWhoLiked: isLiked ? arrayRemove(userId) : arrayUnion(userId)
  })
}

export const addComment = async ({postId, user, content}: AddComment) => {
  await updateDoc(doc(db, 'posts', postId), {
    comments: arrayUnion(
      JSON.stringify({
        authorAvatar: user.photoURL,
        authorNickname: user.displayName,
        content: content,
        date: `${new Date().toISOString()}`,
        authorId: user.uid,
        id: uuidv4()
      })
    )
  })
}

export const removeComment = async ({postId, comment}: RemoveComment) => {
  await updateDoc(doc(db, 'posts', postId), {
    comments: arrayRemove(comment)
  })
}
