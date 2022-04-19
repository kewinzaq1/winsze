import React from "react";
import { db, useAuth } from "../../Auth";
import {
  updateProfile,
  deleteUser,
  updatePassword as updatePasswd,
  updateEmail as updateMail,
  sendEmailVerification,
} from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth, storage } from "../../Auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { Settings } from "./Settings";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { SettingsProps } from "../../Utils/models";

const SettingsContext = React.createContext<Partial<SettingsProps>>({});

interface Props {
  children: JSX.Element;
}

export const SettingsProvider = ({ children }: Props) => {
  const { user } = useAuth();
  const userEmailVerified = user?.emailVerified;

  const deleteAccount = async () => {
    if (currentUser) {
      await toast.promise(
        Promise.all(
          user?.photoURL
            ? [
                deleteDoc(doc(db, "users", currentUser.uid)),
                deleteObject(
                  ref(storage, `ProfilePictures/${currentUser.uid}`)
                ),
                deleteUser(currentUser),
              ]
            : [
                deleteDoc(doc(db, "users", currentUser.uid)),
                deleteUser(currentUser),
              ]
        ),
        {
          loading: "Removing",
          success: `Removed`,
          error: "Try again",
        }
      );
    }
  };

  const initialState: State = {
    isOpenConfirmation: false,
    isFormOpen: false,
    settings: "",
  };

  enum Actions {
    PICTURE = "OPEN_UPDATE_PICTURE",
    NICKNAME = "OPEN_UPDATE_NICKNAME",
    PASSWORD = "OPEN_UPDATE_PASSWORD",
    EMAIL = "OPEN_UPDATE_EMAIL",
    CONFIRMATION = "OPEN_CONFIRMATION",
    RESET = "RESET_ALL",
  }

  interface State {
    isOpenConfirmation: boolean;
    isFormOpen: boolean;
    settings: string;
  }

  function settingsReducer(state: State, action: { type: Actions }) {
    switch (action.type) {
      case "OPEN_UPDATE_PICTURE": {
        return { ...state, isFormOpen: true, settings: "picture" };
      }
      case "OPEN_UPDATE_NICKNAME": {
        return { ...state, isFormOpen: true, settings: "nickname" };
      }
      case "OPEN_UPDATE_PASSWORD": {
        return { ...state, isFormOpen: true, settings: "password" };
      }
      case "OPEN_UPDATE_EMAIL": {
        return { ...state, isFormOpen: true, settings: "email" };
      }
      case "OPEN_CONFIRMATION": {
        return { ...state, isFormOpen: true, settings: "email" };
      }
      case "RESET_ALL": {
        return initialState;
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  }

  const [{ isOpenConfirmation, settings, isFormOpen }, dispatch] =
    React.useReducer(settingsReducer, initialState);

  const closeAll = () => dispatch({ type: Actions.RESET });
  const openUpdatePicture = () => dispatch({ type: Actions.PICTURE });
  const openUpdateUsername = () => dispatch({ type: Actions.NICKNAME });
  const openUpdatePassword = () => dispatch({ type: Actions.PASSWORD });
  const openUpdateEmail = () => dispatch({ type: Actions.EMAIL });
  const openConfirmation = () => dispatch({ type: Actions.CONFIRMATION });

  const currentUser = auth.currentUser;

  const updateNickname = async (newName: string) =>
    currentUser &&
    (await toast.promise(
      updateProfile(currentUser, {
        displayName: newName,
      }),
      {
        loading: "Changing",
        success: () => {
          closeAll();
          updateUserInFirestore({ nickname: newName }).then(() => null);
          return `Changed`;
        },
        error: (e) => e.message,
      }
    ));

  const updatePassword = async (newPassword: string) =>
    currentUser &&
    (await toast.promise(updatePasswd(currentUser, newPassword), {
      loading: "Changing",
      success: () => {
        closeAll();
        return `Changed`;
      },
      error: (e) => e.message,
    }));

  const updatePhoto = async (photo: File) => {
    if (currentUser) {
      const imageRef = ref(storage, `ProfilePictures/${currentUser.uid}`);
      return await toast.promise(uploadBytes(imageRef, photo), {
        loading: "Changing",
        success: () => {
          getDownloadURL(imageRef).then(async (url) => {
            updateProfile(currentUser, {
              photoURL: url,
            }).then(() => updateUserInFirestore({ avatar: url }));
          });
          closeAll();
          return `Look's great!`;
        },
        error: (e) => e.message,
      });
    }
  };

  const verifyEmail = async () =>
    currentUser &&
    (await toast.promise(sendEmailVerification(currentUser), {
      loading: "Sending",
      success: `Delivered`,
      error: (e) => e.message,
    }));

  const updateEmail = async (email: string) =>
    currentUser &&
    (await toast.promise(updateMail(currentUser, email), {
      loading: "Updating",
      success: () => {
        updateUserInFirestore({ email: email }).then(() => null);
        return `Updated`;
      },
      error: (e) => e.message,
    }));

  const typeValidation = settings === "picture" ? "file" : "password";

  const updateUserInFirestore = async (overrides: object) =>
    currentUser &&
    (await updateDoc(doc(db, "users", currentUser.uid), {
      ...overrides,
    }));

  return (
    <SettingsContext.Provider
      value={{
        user,
        userEmailVerified,
        isOpenConfirmation,
        settings,
        deleteAccount,
        closeAll,
        openUpdatePicture,
        openUpdateUsername,
        openUpdatePassword,
        openUpdateEmail,
        openConfirmation,
        isFormOpen,
        verifyEmail,
        typeValidation,
        updatePhoto,
        updateNickname,
        updatePassword,
        updateEmail,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = React.useContext(SettingsContext);
  if (!context)
    throw new Error("useSettings() only used within SettingsProvider");
  return context;
};

export { Settings };
