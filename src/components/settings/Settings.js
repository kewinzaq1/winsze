/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {css, jsx} from '@emotion/react'
import {Typography} from '@mui/material'
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
import {ConfirmationMenu} from './SettingsConfirmation'
import {alertRed} from '../layout'
import {SettingsForm} from './SettingsForm'
import {useSettings} from './index'

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
    resetSettings,
    isFormOpen,
    verifyEmail,
    submitValidation,
    typeValidation,
  } = useSettings()

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
      <ConfirmationMenu
        onAgree={deleteAccount}
        open={isOpenConfirmation}
        onClose={closeAll}
      />
    </main>
  )
}
