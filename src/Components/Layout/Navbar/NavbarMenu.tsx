import * as React from 'react'
import {Avatar, Divider, ListItemIcon, Menu, MenuItem} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import {Link} from 'react-router-dom'
import {NavbarMenuModel} from '../../../Utils/Models/Layout/NavbarMenu.model'

export const NavbarMenu = ({
  anchorEl,
  open,
  handleClose,
  user,
  logout
}: NavbarMenuModel) => (
  <Menu
    anchorEl={anchorEl ?? null}
    id="account-menu"
    open={open}
    onClose={handleClose}
    onClick={handleClose}
    PaperProps={{
      elevation: 0,
      sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        borderRadius: '.5rem',
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1
        },
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0
        }
      }
    }}
    transformOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
  >
    <MenuItem>
      <Avatar>
        {' '}
        {user?.displayName?.[0] ?? user?.email?.split('@')[0][0]}
      </Avatar>{' '}
      {user?.displayName ?? user?.email?.split('@')[0]}
    </MenuItem>
    <Divider />
    <Link to="/settings">
      <MenuItem aria-label="settings">
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
    </Link>
    <MenuItem onClick={logout} aria-label="logout">
      <ListItemIcon>
        <LogoutIcon fontSize="small" />
      </ListItemIcon>
      Logout
    </MenuItem>
  </Menu>
)
