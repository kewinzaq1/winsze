/** @jsxImportSource @emotion/react */
import React from 'react'
// eslint-disable-next-line no-unused-vars
import {jsx, css} from '@emotion/react'
import {
    Button, Typography, AppBar as Bar, Avatar, LinearProgress,
} from '@mui/material'
import {useAuth} from '../../Auth'
import styled from '@emotion/styled'
import {myBlue} from '.'
import {NavbarMenu} from './NavbarMenu'
import {Link} from 'react-router-dom'

// FIXME: update photo

export const Navbar = () => {
    const {
        isLogin, isRegister, setLogin, setRegister, isAuthenticated, user, logout, isLoading,
    } = useAuth()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (<AppBar position="sticky">
            <Nav>
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
                    {isRegister && (<Button variant="contained" onClick={setLogin}>
                            Log In
                        </Button>)}
                    {isLogin && (<Button variant="outlined" onClick={setRegister}>
                            Sign Up
                        </Button>)}
                    {isAuthenticated && (<>
                            <Avatar
                                variant={'rounded'}
                                onClick={handleClick}
                                sx={{bgcolor: myBlue, cursor: 'pointer'}}
                                alt={user?.displayName ?? user?.email}
                                src={user?.photoURL}
                            >
                                {!user?.displayName && !user?.photoURL && user?.email?.split('@')[0][0]}
                            </Avatar>
                            <NavbarMenu
                                anchorEl={anchorEl}
                                open={open}
                                handleClick={handleClick}
                                handleClose={handleClose}
                                user={user}
                                logout={logout}
                            />
                        </>)}
                </NavActions>
            </Nav>
            {isLoading && <LinearProgress/>}
        </AppBar>)
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
