import {useAuth} from '../../Auth'
import {
  updateProfile,
  deleteUser,
  updatePassword as updatePasswd,
  updateEmail as updateMail,
  sendEmailVerification,
} from 'firebase/auth'
import {toast} from 'react-hot-toast'
import {auth, storage} from '../../Auth'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {createContext, useContext, useState} from 'react'

const SettingsContext = createContext()

export const SettingsProvider = ({children}) => {
  const {user} = useAuth()
  const userEmailVerified = user.emailVerified
  const [isOpenConfirmation, setIsConfirmationOpen] = useState(false)
  const [settings, setSettings] = useState(null)
  const deleteAccount = async () => await deleteUser(currentUser)

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
    setSettings('username')
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

  const updateUserName = newName =>
    toast.promise(
      updateProfile(currentUser, {
        displayName: newName,
      }),
      {
        loading: 'Changing username',
        success: () => {
          closeAll()
          return `Successful changed @${newName}`
        },
        error: e => e.code,
      },
    )
  const updatePassword = newPassword =>
    toast.promise(updatePasswd(currentUser, newPassword), {
      loading: 'Password is changing',
      success: () => {
        closeAll()
        return `Password successful changed`
      },
      error: e => e.code,
    })
  const updatePhoto = photo => {
    const imageRef = ref(storage, `ProfilePictures/${currentUser.uid}`)
    return toast.promise(uploadBytes(imageRef, photo), {
      loading: 'Photo is changing',
      success: () => {
        getDownloadURL(imageRef).then(async url => {
          await updateProfile(currentUser, {
            photoURL: url,
          })
        })
        closeAll()
        return `That's look great!`
      },
      error: e => e.code,
    })
  }
  const verifyEmail = () => {
    return toast.promise(sendEmailVerification(auth.currentUser), {
      loading: 'Email sending',
      success: `Email delivered`,
      error: e => e.code,
    })
  }

  const updateEmail = email => {
    return toast.promise(updateMail(auth.currentUser, email), {
      loading: 'Email has been updated',
      success: `Email updated`,
      error: e => e.code,
    })
  }

  const submitValidation = () => {
    if (settings === 'picture') {
      return updatePhoto
    }
    if (settings === 'username') {
      return updateUserName
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
