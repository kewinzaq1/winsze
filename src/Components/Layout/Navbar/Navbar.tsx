/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import {css} from '@emotion/react'
import * as React from 'react'
import {Avatar, Button, LinearProgress, Typography} from '@mui/material'
import {NavbarMenu} from './NavbarMenu'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../Auth'
import {User as FireAuthUser} from 'firebase/auth'
import {myBlue} from '../../../Utils/Layout'
import {AppBar, Nav, NavActions} from './NavbarStyles'

export const Navbar = () => {
  const {
    isLogin,
    isRegister,
    setLogin,
    setRegister,
    isAuthenticated,
    user,
    logout,
    isLoading,
    status
  } = useAuth()
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>()
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(undefined)
  }
  const usernameShortcut = (user: FireAuthUser) => user?.displayName?.[0]
  const emailShortcut = (user: FireAuthUser | undefined) =>
    user?.email?.split('@')[0][0]

  return (
    <AppBar position="sticky">
      <Nav status={status}>
        <Typography
          variant="h1"
          css={css`
            font-weight: 400;
            color: #111;
          `}
        >
          <Link to="/">
            win<span>sze</span>
          </Link>
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
                aria-label="account-menu"
                onClick={handleClick}
                variant={'rounded'}
                alt={user?.email ?? ''}
                src={user?.photoURL ?? ''}
                sx={{bgcolor: myBlue, cursor: 'pointer'}}
              >
                {!user?.displayName && !user?.photoURL && emailShortcut(user)}
                {user?.displayName && !user?.photoURL && usernameShortcut(user)}
              </Avatar>
              <NavbarMenu
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
                user={user}
                logout={logout}
              />
            </>
          )}
        </NavActions>
      </Nav>
      {isLoading && <LinearProgress />}
    </AppBar>
  )
}
