/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react'
import {useState} from 'react'
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Typography,
} from '@mui/material'
import BadgeIcon from '@mui/icons-material/Badge'
import PortraitIcon from '@mui/icons-material/Portrait'
import PasswordIcon from '@mui/icons-material/Password'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {alertRed} from '../../layout'
import {
  updateProfile,
  deleteUser,
  updatePassword as updatePasswd,
} from 'firebase/auth'
import {toast} from 'react-hot-toast'
import {AccountForm} from './AccountForm'
import {ConfirmationMenu} from './ConfirmationMenu'
import {auth, storage} from '../../../Auth'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

function AccountSetting({closeModal: close, isModalOpen: open, user} = {}) {
  const [settings, setSettings] = useState(null)
  const deleteAccount = () => deleteUser(currentUser)
  const closeAll = () => {
    close()
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
        error: 'Try again!',
      },
    )
  const updatePassword = newPassword =>
    toast.promise(updatePasswd(currentUser, newPassword), {
      loading: 'Password is changing',
      success: () => {
        closeAll()
        return `Password successful changed`
      },
      error: 'Try again!',
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
      error: 'Try again!',
    })
  }

  const onSubmitValidation = () => {
    if (settings === 'username') {
      return updateUserName
    }
    if (settings === 'password') {
      return updatePassword
    }
    if (settings === 'picture') {
      return updatePhoto
    }
  }

  const typeValidation = () => {
    if (settings === 'password') {
      return 'password'
    }
    if (settings === 'picture') {
      return 'file'
    }
    return 'text'
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    minWidth: '200px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '.5rem',
  }

  return (
    <Modal
      keepMounted
      open={open}
      onClose={close}
      aria-labelledby="modal-settings-title"
      aria-describedby="modal-settings-description"
    >
      <>
        <Box sx={style}>
          <Typography
            id="modal-settings-title"
            variant="h4"
            component="h1"
            css={css`
              white-space: pre-wrap;
              width: 100%;
            `}
          >
            Hi <b>@{user?.displayName}</b> change your settings
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="subtitle1"
            component="h2"
            css={css`
              margin-top: 0.5rem;
            `}
          >
            Personalize account for your preferences
          </Typography>
          <List
            css={css`
              width: 100%;
              margin-top: 1rem;
              li {
                cursor: pointer;
              }
            `}
          >
            <ListItem onClick={openUpdateUsername}>
              <ListItemAvatar>
                <Avatar>
                  <BadgeIcon />
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
              <ListItemText
                primary="Password"
                secondary="Change your password"
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
        <AccountForm
          open={isFormOpen}
          onClose={resetSettings}
          placeholder={settings}
          onSubmit={onSubmitValidation()}
          type={typeValidation()}
        />
        <ConfirmationMenu
          open={isConfirmationOpen}
          onClose={resetSettings}
          onAgree={deleteAccount}
        />
      </>
    </Modal>
  )
}

export default AccountSetting
