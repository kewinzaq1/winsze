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
import {getAuth, updateProfile, deleteUser} from 'firebase/auth'
import {toast} from 'react-hot-toast'
import {AccountForm} from './AccountForm'
import {ConfirmationMenu} from './ConfirmationMenu'

function AccountSetting({closeModal: close, isModalOpen: open, user}) {
  const [settings, setSettings] = useState(null)
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
    borderRadius: '1.25rem',
  }

  const auth = getAuth()
  const currentUser = auth.currentUser

  const updateUserName = newName =>
    toast.promise(
      updateProfile(currentUser, {
        displayName: newName,
      }),
      {
        loading: 'Changing username',
        success: 'Successful username changed',
        error: 'Error username changed',
      },
    )

  const deleteAccount = async () => await deleteUser(currentUser)

  const isOpenSettings = settings !== null
  const isProfilePicture = settings === 'picture'
  const isPassword = settings === 'password'
  const isUsername = settings === 'username'
  const isConfirmation = settings === 'confirm'
  const openUpdatePicture = () => setSettings('picture')
  const openUpdateUsername = () => setSettings('username')
  const openUpdatePassword = () => setSettings('passwd')
  const openConfirmation = () => setSettings('confirm')
  const resetSettings = () => setSettings(null)

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
            variant="h3"
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
            Personalize settings for your preferences
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
        {isOpenSettings && <AccountForm />}
        <ConfirmationMenu
          open={isConfirmation}
          onClose={resetSettings}
          onAgree={deleteAccount}
        />
      </>
    </Modal>
  )
}

export default AccountSetting
