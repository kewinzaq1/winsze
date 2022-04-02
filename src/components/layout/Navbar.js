/** @jsxImportSource @emotion/react */
import React from 'react'
// eslint-disable-next-line no-unused-vars
import {jsx, css} from '@emotion/react'
import {
  Button,
  Typography,
  AppBar as Bar,
  Avatar,
  LinearProgress,
} from '@mui/material'
import {useAuth} from '../../Auth'
import styled from '@emotion/styled'
import {myBlue} from '.'
import {AccountMenu} from './account-menu/AccountMenu'

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
              <AccountMenu
                anchorEl={anchorEl}
                open={open}
                handleClick={handleClick}
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
