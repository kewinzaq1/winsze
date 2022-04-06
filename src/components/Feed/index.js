import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../Auth";
import { FeedHeading } from "./FeedHeading";

export const Feed = () => {
  return <FeedHeading />;
};

export const uploadPost = async (user, desc, photo) => {
  if (photo) {
    const imageRef = ref(storage, `PostsPhotos/`);
    uploadBytes(imageRef, photo).then(() => {
      getDownloadURL(imageRef).then(async (photoURL) => {
        await addDoc(collection(db, "posts"), {
          publisherNickname: user.displayName,
          publisherPhotoURL: user.photoURL,
          publishedDate: `${new Date().toLocaleTimeString("en")}`,
          description: desc,
          photoURL: photoURL,
        });
      });
    });
  }
  return await addDoc(collection(db, "posts"), {
    publisherNickname: user.displayName,
    publisherPhotoURL: user.photoURL,
    publishedDate: `${new Date().toLocaleTimeString("en")}`,
    description: desc,
  });
};
