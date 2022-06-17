/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import {css, jsx} from '@emotion/react'
import {Typography} from '@mui/material'
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  Box,
  List,
  ListItemText
} from '@mui/material'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import PortraitIcon from '@mui/icons-material/Portrait'
import PasswordIcon from '@mui/icons-material/Password'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined'
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined'
import {ConfirmationDeleteMenu} from '../Layout/ConfirmationDeleteMenu'
import {SettingsForm} from './SettingsForm/SettingsForm'
import {alertRed, maxWidth, styleFlexColumn} from '../../Utils/Layout'
import {useSettings} from '../../Utils/Hooks/Settings/useSettings'

export const Settings = () => {
  const {
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
    typeValidation
  } = useSettings()

  return (
    <main
      css={css`
        max-width: ${maxWidth};
        margin: 0 auto;
        padding-bottom: 56px;
      `}
    >
      <Box css={styleFlexColumn}>
        <Typography variant="h2" component="h1">
          Settings
        </Typography>
        <Typography variant="h5" component="h2">
          Personalize account for your preferences
        </Typography>
      </Box>
      <Divider />
      <Box>
        <List
          css={css`
            width: 100%;
            padding: 0 1rem;

            li {
              cursor: pointer;
              padding-left: 0;
              padding-right: 0;
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
              secondary={`${
                user?.displayName ? `@${user?.displayName}` : 'Set nickname'
              }`}
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
                  : `Send verification email`
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
        onClose={closeAll}
        placeholder={
          settings && `${settings?.[0]?.toUpperCase() + settings?.slice(1)}`
        }
        type={typeValidation}
      />
      <ConfirmationDeleteMenu
        onAgree={deleteAccount}
        open={isOpenConfirmation}
        onClose={closeAll}
        deleteItem="account"
      />
    </main>
  )
}
