import {db, useAuth} from '../../Auth'
import {
  updateProfile,
  deleteUser,
  updatePassword as updatePasswd,
  updateEmail as updateMail,
  sendEmailVerification,
} from 'firebase/auth'
import {toast} from 'react-hot-toast'
import {auth, storage} from '../../Auth'
import {ref, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage'
import {createContext, useContext, useState} from 'react'
import {Settings} from './Settings'
import {deleteDoc, doc, updateDoc} from 'firebase/firestore'

const SettingsContext = createContext()

export const SettingsProvider = ({children}) => {
  const {user} = useAuth()
  const userEmailVerified = user?.emailVerified
  const [isOpenConfirmation, setIsConfirmationOpen] = useState(false)
  const [settings, setSettings] = useState('')
  const deleteAccount = async () => {
    toast.promise(
      Promise.all(
        user.photoURL
          ? [
              deleteDoc(doc(db, 'users', auth.currentUser.uid)),
              deleteObject(
                ref(storage, `ProfilePictures/${auth.currentUser.uid}`),
              ),
              deleteUser(currentUser),
            ]
          : [
              deleteDoc(doc(db, 'users', auth.currentUser.uid)),
              deleteUser(currentUser),
            ],
      ),
      {
        loading: 'Removing',
        success: `Removed`,
        error: 'Try again',
      },
    )
  }

  const closeAll = () => {
    setIsConfirmationOpen(false)
    setIsFormOpen(false)
  }
  const openUpdatePicture = () => {
    setIsFormOpen(true)
    setSettings('picture')
  }
  const openUpdateUsername = () => {
    setIsFormOpen(true)
    setSettings('nickname')
  }
  const openUpdatePassword = () => {
    setIsFormOpen(true)
    setSettings('password')
  }
  const openUpdateEmail = () => {
    setIsFormOpen(true)
    setSettings('email')
  }
  const openConfirmation = () => setIsConfirmationOpen(true)

  const resetSettings = () => {
    setIsFormOpen(false)
    setIsConfirmationOpen(false)
  }

  const [isFormOpen, setIsFormOpen] = useState(false)

  const currentUser = auth.currentUser

  const updateNickname = newName =>
    toast.promise(
      updateProfile(currentUser, {
        displayName: newName,
      }),
      {
        loading: 'Changing',
        success: () => {
          closeAll()
          updateUserInFirestore({nickname: newName}).then(() => {})
          return `Changed`
        },
        error: e => e.message,
      },
    )

  const updatePassword = newPassword =>
    toast.promise(updatePasswd(currentUser, newPassword), {
      loading: 'Changing',
      success: () => {
        closeAll()
        return `Changed`
      },
      error: e => e.message,
    })

  const updatePhoto = photo => {
    const imageRef = ref(storage, `ProfilePictures/${currentUser.uid}`)
    return toast.promise(uploadBytes(imageRef, photo), {
      loading: 'Changing',
      success: () => {
        getDownloadURL(imageRef).then(async url => {
          updateProfile(currentUser, {
            photoURL: url,
          }).then(() => updateUserInFirestore({avatar: url}))
        })
        closeAll()
        return `Look's great!`
      },
      error: e => e.message,
    })
  }

  const verifyEmail = () => {
    return toast.promise(sendEmailVerification(auth.currentUser), {
      loading: 'Sending',
      success: `Delivered`,
      error: e => e.message,
    })
  }

  const updateEmail = email => {
    return toast.promise(updateMail(auth.currentUser, email), {
      loading: 'Updating',
      success: () => {
        updateUserInFirestore({email: email}).then(() => {})
        return `Updated`
      },
      error: e => e.message,
    })
  }

  const submitValidation = () => {
    if (settings === 'picture') {
      return updatePhoto
    }
    if (settings === 'nickname') {
      return updateNickname
    }
    if (settings === 'password') {
      return updatePassword
    }
    if (settings === 'email') {
      return updateEmail
    }
  }
  const typeValidation = () => {
    if (settings === 'picture') {
      return 'file'
    }
    if (settings === 'password') {
      return 'password'
    }
  }

  const updateUserInFirestore = overrides =>
    updateDoc(doc(db, 'users', auth.currentUser.uid), {
      ...overrides,
    })

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
        resetSettings,
        isFormOpen,
        verifyEmail,
        submitValidation,
        typeValidation,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context)
    throw new Error('useSettings() only used within SettingsProvider')
  return context
}

export {Settings}
