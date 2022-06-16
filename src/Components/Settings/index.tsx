import * as React from 'react'
import {db, useAuth} from '../../Auth'
import {
  updateProfile,
  deleteUser,
  updatePassword as updatePasswordFirebase,
  updateEmail as updateEmailFirebase,
  sendEmailVerification
} from 'firebase/auth'
import {toast} from 'react-hot-toast'
import {auth, storage} from '../../Auth'
import {ref, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage'
import {Settings} from './Settings'
import {deleteDoc, doc, updateDoc} from 'firebase/firestore'
import {SettingsProps} from '../../Utils/Models'

const SettingsContext = React.createContext<SettingsProps | null>(null)

export const SettingsProvider = ({children}: {children: React.ReactNode}) => {
  const {user} = useAuth()
  const userEmailVerified = user?.emailVerified ?? false

  const deleteAccount = async () => {
    if (currentUser) {
      await toast.promise(
        Promise.all(
          user?.photoURL
            ? [
                deleteDoc(doc(db, 'users', currentUser.uid)),
                deleteObject(
                  ref(storage, `ProfilePictures/${currentUser.uid}`)
                ),
                deleteUser(currentUser)
              ]
            : [
                deleteDoc(doc(db, 'users', currentUser.uid)),
                deleteUser(currentUser)
              ]
        ),
        {
          loading: 'Removing',
          success: `Removed`,
          error: 'Try again'
        }
      )
    }
  }

  const initialState: State = {
    isOpenConfirmation: false,
    isFormOpen: false,
    settings: ''
  }

  interface State {
    isOpenConfirmation: boolean
    isFormOpen: boolean
    settings: string
  }

  enum ActionType {
    OPEN_UPDATE_PICTURE = 'OPEN_UPDATE_PICTURE',
    OPEN_UPDATE_NICKNAME = 'OPEN_UPDATE_NICKNAME',
    OPEN_UPDATE_PASSWORD = 'OPEN_UPDATE_PASSWORD',
    OPEN_UPDATE_EMAIL = 'OPEN_UPDATE_EMAIL',
    OPEN_CONFIRMATION = 'OPEN_CONFIRMATION',
    RESET_ALL = 'RESET_ALL'
  }

  type Action =
    | {type: ActionType.OPEN_UPDATE_PICTURE}
    | {type: ActionType.OPEN_UPDATE_NICKNAME}
    | {type: ActionType.OPEN_UPDATE_PASSWORD}
    | {type: ActionType.OPEN_UPDATE_EMAIL}
    | {type: ActionType.OPEN_CONFIRMATION}
    | {type: ActionType.RESET_ALL}

  function settingsReducer(state: State, action: Action): State {
    switch (action.type) {
      case ActionType.OPEN_UPDATE_PICTURE: {
        return {...state, isFormOpen: true, settings: 'picture'}
      }
      case ActionType.OPEN_UPDATE_NICKNAME: {
        return {...state, isFormOpen: true, settings: 'nickname'}
      }
      case ActionType.OPEN_UPDATE_EMAIL: {
        return {...state, isFormOpen: true, settings: 'nickname'}
      }
      case ActionType.OPEN_UPDATE_PASSWORD: {
        return {...state, isFormOpen: true, settings: 'password'}
      }
      case ActionType.OPEN_CONFIRMATION: {
        return {...state, isOpenConfirmation: true, settings: 'confirmation'}
      }
      case ActionType.RESET_ALL: {
        return initialState
      }
    }
  }

  const [{isOpenConfirmation, settings, isFormOpen}, dispatch] =
    React.useReducer(settingsReducer, initialState)

  const closeAll = () => dispatch({type: ActionType.RESET_ALL})
  const openUpdatePicture = () =>
    dispatch({type: ActionType.OPEN_UPDATE_PICTURE})
  const openUpdateUsername = () =>
    dispatch({type: ActionType.OPEN_UPDATE_NICKNAME})
  const openUpdatePassword = () =>
    dispatch({type: ActionType.OPEN_UPDATE_PASSWORD})
  const openUpdateEmail = () => dispatch({type: ActionType.OPEN_UPDATE_EMAIL})
  const openConfirmation = () => dispatch({type: ActionType.OPEN_CONFIRMATION})

  const currentUser = auth.currentUser

  const updateNickname = async (newName: string) =>
    currentUser &&
    (await toast.promise(
      updateProfile(currentUser, {
        displayName: newName
      }),
      {
        loading: 'Changing',
        success: () => {
          closeAll()
          updateUserInFirestore({nickname: newName}).then(() => null)
          return `Changed`
        },
        error: e => e.message
      }
    ))

  const updatePassword = async (newPassword: string) =>
    currentUser &&
    (await toast.promise(updatePasswordFirebase(currentUser, newPassword), {
      loading: 'Changing',
      success: () => {
        closeAll()
        return `Changed`
      },
      error: e => e.message
    }))

  const updatePhoto = async (photo: File) => {
    if (currentUser) {
      const imageRef = ref(storage, `ProfilePictures/${currentUser.uid}`)
      return await toast.promise(uploadBytes(imageRef, photo), {
        loading: 'Changing',
        success: () => {
          getDownloadURL(imageRef).then(async url => {
            updateProfile(currentUser, {
              photoURL: url
            }).then(() => updateUserInFirestore({avatar: url}))
          })
          closeAll()
          return `Look's great!`
        },
        error: e => e.message
      })
    }
  }

  const verifyEmail = async () =>
    currentUser &&
    (await toast.promise(sendEmailVerification(currentUser), {
      loading: 'Sending',
      success: `Delivered`,
      error: e => e.message
    }))

  const updateEmail = async (email: string) =>
    currentUser &&
    (await toast.promise(updateEmailFirebase(currentUser, email), {
      loading: 'Updating',
      success: () => {
        updateUserInFirestore({email: email}).then(() => null)
        return `Updated`
      },
      error: e => e.message
    }))

  const typeValidation = settings === 'picture' ? 'file' : 'password'

  const updateUserInFirestore = async (overrides: object) =>
    currentUser &&
    (await updateDoc(doc(db, 'users', currentUser.uid), {
      ...overrides
    }))

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
        updateEmail
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = React.useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings() only used within SettingsProvider')
  }
  return context
}

export {Settings}
