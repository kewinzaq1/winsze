/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {css, jsx} from '@emotion/react'
import {useEffect, useState} from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Settings from '@mui/icons-material/Settings'
import ArticleIcon from '@mui/icons-material/Article'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import {useLocation, useNavigate} from 'react-router-dom'
import {useAuth} from '../../Auth'
import {maxWidth} from '.'

export const Footer = () => {
  const {user} = useAuth()
  const {pathname} = useLocation()
  const [path, setPath] = useState(pathname)
  const navigate = useNavigate()

  // TODO: fix style bottom post bug

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
        position: fixed;
        width: 100%;
        bottom: 0;
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
        <BottomNavigationAction label="Feed" value="/" icon={<ArticleIcon />} />
        <BottomNavigationAction
          label="Friends"
          value="/friends"
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
