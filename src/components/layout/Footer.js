/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {css, jsx} from '@emotion/react'
import {useEffect, useState} from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Settings from '@mui/icons-material/Settings'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import {Navigate, useLocation, useNavigate} from 'react-router-dom'
import {useAuth} from '../../Auth'

export const Footer = () => {
  const {user} = useAuth()
  const {pathname} = useLocation()
  const [path, setPath] = useState(pathname)
  const navigate = useNavigate()

  useEffect(() => {
    setPath(pathname)
  }, [pathname])

  const handleChange = (event: React.SyntheticEvent, newPath: string) => {
    setPath(newPath)
    navigate(newPath)
  }

  if (!user) {
    return
  }

  return (
      <footer
          css={css`
        margin-top: 50px;
      `}
      >
        <BottomNavigation
            css={css`
          position: fixed;
          width: 100vw;
          bottom: 0;
        `}
            value={path}
            onChange={handleChange}
        >
          <BottomNavigationAction
    label="Feed"
    value="/"
    onClick={() => <Navigate to="/feed"/>}
    icon={<NewspaperIcon/>}
    />
          <BottomNavigationAction
              label="Favorites"
              value="/favorites"
              icon={<PeopleAltIcon />}
          />
          <BottomNavigationAction
              label="Settings"
              value="/settings"
              icon={<Settings />}
          />
        </BottomNavigation>
      </footer>
  )
}
