/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import {css} from '@emotion/react'
import * as React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Settings from '@mui/icons-material/Settings'
import ArticleIcon from '@mui/icons-material/Article'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import {useLocation, useNavigate} from 'react-router-dom'
import {useAuth} from '../../Auth'
import {maxWidth} from './LayoutStyles'

export const Footer = () => {
  const {user} = useAuth()
  const {pathname} = useLocation()
  const [path, setPath] = React.useState(pathname)
  const navigate = useNavigate()

  React.useEffect(() => {
    setPath(
      pathname.includes('users') && !pathname.includes(user?.uid as string)
        ? '/users'
        : pathname
    )
  }, [pathname, user?.uid])

  const handleChange = (event: React.SyntheticEvent, newPath: string) => {
    setPath(newPath)
    navigate(newPath)
  }

  if (!user) {
    return null
  }

  return (
    <footer
      css={css`
        position: fixed;
        width: 100%;
        bottom: 0;
        background: #fff;
      `}
    >
      <BottomNavigation
        value={path}
        onChange={handleChange}
        css={css`
          max-width: ${maxWidth};
          display: flex;
          justify-content: space-between;
          margin: 0 auto;
        `}
      >
        <BottomNavigationAction
          aria-label="go to feed"
          label="Feed"
          value="/"
          icon={<ArticleIcon />}
        />
        <BottomNavigationAction
          aria-label="go to users"
          label="Users"
          value={'/users'}
          icon={<PeopleAltIcon />}
        />
        <BottomNavigationAction
          aria-label="go to you"
          label="You"
          value={`/users/${user?.uid}`}
          icon={<AccountBoxIcon />}
        />
        <BottomNavigationAction
          aria-label="go to settings"
          label="Settings"
          value="/settings"
          icon={<Settings />}
        />
      </BottomNavigation>
    </footer>
  )
}
