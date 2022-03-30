/** @jsxImportSource @emotion/react */
import React, {useState} from 'react'
import {jsx, css} from '@emotion/react'
import {
  Button,
  Typography,
  AppBar as Bar,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  LinearProgress,
} from '@mui/material'
import {useAuth} from '../../Auth'
import styled from '@emotion/styled'
import {myBlue} from '.'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import {signOut} from 'firebase/auth'
import {Navigate} from 'react-router-dom'

export const Navbar = () => {
  const {
    isLogin,
    isRegister,
    setLogin,
    setRegister,
    isAuthenticated,
    status,
    setStatus,
    user,
    logout,
    isLoading,
  } = useAuth()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="sticky">
      <Nav>
        <Typography
          variant="h1"
          css={css`
            font-weight: 400;
          `}
        >
          win<span>sze</span>
        </Typography>
        <NavActions>
          {isRegister && (
            <Button variant="contained" onClick={setLogin}>
              Log In
            </Button>
          )}
          {isLogin && (
            <Button variant="outlined" onClick={setRegister}>
              Sign Up
            </Button>
          )}
          {isAuthenticated && (
            <>
              <Avatar
                onClick={handleClick}
                sx={{bgcolor: myBlue, cursor: 'pointer'}}
                alt={user?.displayName}
                src={user?.photoURL}
              >
                {user?.displayName?.[0]}
              </Avatar>
              <Menu
                anchorEl={anchorEl}
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
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
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
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              >
                <MenuItem>
                  <Avatar> {user?.displayName?.[0]}</Avatar> {user?.displayName}
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </NavActions>
      </Nav>
      {isLoading && <LinearProgress />}
    </AppBar>
  )
}

const AppBar = styled(Bar)`
  box-shadow: var(--light-box-shadow);
  background: #eceff1;
`

const baseFlex = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Nav = styled.nav`
  ${baseFlex};
  width: 90%;
  height: 100px;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;

  h1 {
    font-size: 2.25rem;
    span {
      color: #1565c0;
    }
  }

  button {
    white-space: nowrap;
  }
`

const NavActions = styled.div`
  height: 100%;
  ${baseFlex};
  gap: 0.25rem;
`
