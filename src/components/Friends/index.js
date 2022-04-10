/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {css, jsx} from '@emotion/react'
import {Box, Typography} from '@mui/material'
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore'
import {lazy, Suspense} from 'react'
import {db} from '../../Auth'
import {maxWidth, Progress} from '../layout'
const Users = lazy(() => import('./Users'))

export const Friends = () => (
  <Box
    css={css`
      margin: 0 auto;
      width: 100%;
      max-width: ${maxWidth};
      padding: 1rem;
    `}
  >
    <Box>
      <Typography variant="h2" component="h1">
        Friends
      </Typography>
      <Typography variant="h5" component="h2">
        Check all users
      </Typography>
    </Box>
    <Suspense fallback={<Progress />}>
      <Users />
    </Suspense>
  </Box>
)

export const streamFriends = (snapshot, error) => {
  const itemsColRef = collection(db, 'users')
  const itemsQuery = query(itemsColRef, orderBy('registerDate', 'desc'))
  return onSnapshot(itemsQuery, snapshot, error)
}
