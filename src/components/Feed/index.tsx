/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { jsx, css } from "@emotion/react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { User } from "firebase/auth";
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
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  SnapshotListenOptions,
} from "firebase/firestore";
import { db, storage } from "../../Auth";
import { FeedHeading } from "./FeedHeading";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { maxWidth, Progress } from "../Layout";

const Posts = React.lazy(() => import("./Posts"));

// TODO all to interface for keep semantic :)

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
      <React.Suspense key={"suspense-feed"} fallback={<Progress />}>
        <Posts />
      </React.Suspense>
    </main>
  );
};

interface UploadPost {
  user: User;
  desc: string;
  photo?: File;
}

export const uploadPost = async ({ user, desc, photo }: UploadPost) => {
  const postUid = uuidv4();

  if (photo) {
    const imageRef = ref(storage, `PostsPhotos/${postUid}`);
    return uploadBytes(imageRef, photo).then(() => {
      getDownloadURL(imageRef).then(async (photoURL) => {
        await setDoc(doc(db, "posts", postUid), {
          author: user.displayName ?? user.email?.split("@")[0],
          avatar: user.photoURL,
          date: `${new Date().toISOString()}`,
          description: desc,
          photo: photoURL,
          id: postUid,
          authorId: user.uid,
        });
      });
    });
  } else
    return await setDoc(doc(db, "posts", postUid), {
      author: user.displayName ?? user.email?.split("@")[0],
      avatar: user.photoURL,
      date: `${new Date().toISOString()}`,
      description: desc,
      id: postUid,
      authorId: user.uid,
    });
};

const postsRef = collection(db, "posts");
export const q = query(postsRef, orderBy("date", "desc"));

export const streamPosts = (
  snapshot: SnapshotListenOptions,
  error: {
    next?: (snapshot: QuerySnapshot<DocumentData>) => void;
    error?: (error: FirestoreError) => void;
    complete?: () => void;
  }
) => {
  const itemsColRef = collection(db, "posts");
  const itemsQuery = query(itemsColRef, orderBy("date", "desc"));
  return onSnapshot(itemsQuery, snapshot, error);
};

export const removePost = async (id: string, photo: string | undefined) => {
  await deleteDoc(doc(db, "posts", id));
  if (photo) {
    await deleteObject(ref(storage, `PostsPhotos/${id}`));
  }
};

interface UpdatePost {
  id: string;
  editPhotoFile?: File;
  originalPhoto?: string;
  isPhotoChanged: boolean;
  overwrites?: object;
}

export const updatePost = async ({
  id,
  editPhotoFile,
  originalPhoto,
  isPhotoChanged,
  overwrites,
}: UpdatePost) => {
  if (editPhotoFile && isPhotoChanged) {
    const imageRef = ref(storage, `PostsPhotos/${id}`);
    return uploadBytes(imageRef, editPhotoFile).then(() => {
      getDownloadURL(imageRef).then(async (photo) => {
        await updateDoc(doc(db, "posts", id), {
          ...overwrites,
          photo: photo,
        });
      });
    });
  } else if (!originalPhoto && isPhotoChanged) {
    return await updateDoc(doc(db, "posts", id), {
      ...overwrites,
      photo: null,
    });
  } else if (originalPhoto && isPhotoChanged && !editPhotoFile) {
    return await updateDoc(doc(db, "posts", id), {
      ...overwrites,
      photo: null,
    });
  } else {
    return await updateDoc(doc(db, "posts", id), {
      ...overwrites,
    });
  }
};

interface ToggleLike {
  id: string;
  isLiked?: boolean;
  userId: string;
}

export const toggleLike = async ({ id, isLiked, userId }: ToggleLike) => {
  await updateDoc(doc(db, "posts", id), {
    likes: increment(isLiked ? -1 : 1),
    usersWhoLiked: isLiked ? arrayRemove(userId) : arrayUnion(userId),
  });
};

interface AddComment {
  postId: string;
  user: User;
  content: string;
}

export const addComment = async ({ postId, user, content }: AddComment) => {
  await updateDoc(doc(db, "posts", postId), {
    comments: arrayUnion(
      JSON.stringify({
        authorAvatar: user.photoURL,
        authorNickname: user.displayName,
        content: content,
        date: `${new Date().toISOString()}`,
        authorId: user.uid,
        id: uuidv4(),
      })
    ),
  });
};

interface RemoveComment {
  postId: string;
  comment: string;
}

export const removeComment = async ({ postId, comment }: RemoveComment) => {
  await updateDoc(doc(db, "posts", postId), {
    comments: arrayRemove(comment),
  });
};
