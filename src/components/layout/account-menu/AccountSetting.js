/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react'
import {
  Avatar,
  Box,
  Dialog,
  DialogTitle,
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

function AccountSetting({closeModal: close, isModalOpen: open, user}) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '1rem',
  }
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-settings-title"
      aria-describedby="modal-settings-description"
    >
      <Box sx={style}>
        <Typography id="modal-settings-title" variant="h4" component="h1">
          Hi {user?.displayName} change your settings
        </Typography>
        <Typography
          id="modal-modal-description"
          variant="subtitle1"
          component="h2"
        >
          Personalize settings for your preferences
        </Typography>
        <List
          sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
          css={css`
            li {
              cursor: pointer;
            }
          `}
        >
          <ListItem>
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
          <ListItem>
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
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PasswordIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Password" secondary="Change your password" />
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem>
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
    </Modal>
  )
}

export default AccountSetting
