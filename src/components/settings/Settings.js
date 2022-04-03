/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react'
import React, {useState} from 'react'
import {useAuth} from '../../Auth'
import {Typography} from '@mui/material'
import {
  updateProfile,
  deleteUser,
  updatePassword as updatePasswd,
  updateEmail as updateMail,
  sendEmailVerification,
} from 'firebase/auth'
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  Box,
  List,
  ListItemText,
} from '@mui/material'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import PortraitIcon from '@mui/icons-material/Portrait'
import PasswordIcon from '@mui/icons-material/Password'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined'
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined'
import {toast} from 'react-hot-toast'
import {ConfirmationMenu} from './SettingsConfirmation'
import {auth, storage} from '../../Auth'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {alertRed} from '../layout'
import {SettingsForm} from './SettingsForm'

// TODO: add removeUser confirmation and impl. function

export const Settings = () => {
  const {user} = useAuth()
  const userEmailVerified = user.emailVerified
  const [isOpenConfirmation, setIsOpenConfirmation] = React.useState(false)
  const [settings, setSettings] = useState(null)
  const deleteAccount = () => deleteUser(currentUser)

  const closeAll = () => {
    setIsOpenConfirmation(false)
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
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

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
    <main
      css={css`
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin: 0 auto;
        max-width: 1400px;
        width: 90%;
        padding: 1rem;
        gap: 1rem;
      `}
    >
      <Typography variant="h2" component="h1">
        Settings
      </Typography>
      <Typography variant="h5" component="h2">
        Personalize account for your preferences
      </Typography>
      <Box>
        <List
          css={css`
            margin-top: 1rem;
            margin: 1rem auto;
            li {
              cursor: pointer;
            }
          `}
        >
          <ListItem onClick={openUpdateUsername}>
            <ListItemAvatar>
              <Avatar>
                <BadgeOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Nickname"
              secondary={`@${user?.displayName}`}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem onClick={openUpdatePicture}>
            <Divider />
            <ListItemAvatar>
              <Avatar>
                <PortraitIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Profile picture"
              secondary="Update profile picture"
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem onClick={openUpdatePassword}>
            <ListItemAvatar>
              <Avatar>
                <PasswordIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Password" secondary="Change your password" />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem onClick={userEmailVerified ? openUpdateEmail : verifyEmail}>
            <ListItemAvatar>
              <Avatar>
                {userEmailVerified ? (
                  <MailOutlinedIcon />
                ) : (
                  <MarkEmailReadOutlinedIcon />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Email"
              secondary={
                userEmailVerified
                  ? `Change your email`
                  : `Send email email verification`
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem onClick={openConfirmation}>
            <ListItemAvatar>
              <Avatar
                css={css`
                  background: ${alertRed};
                `}
              >
                <DeleteForeverIcon
                  css={css`
                    fill: white;
                  `}
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Delete account"
              secondary="Leave me forever"
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </Box>
      <SettingsForm
        open={isFormOpen}
        onClose={resetSettings}
        label={settings}
        placeholder={`${settings?.[0]?.toUpperCase() + settings?.slice(1)}`}
        onSubmit={submitValidation()}
        type={typeValidation()}
      />
      {isOpenConfirmation && (
        <ConfirmationMenu
          onSubmit={deleteAccount}
          open={isConfirmationOpen}
          onClose={closeAll}
        />
      )}
    </main>
  )
}
