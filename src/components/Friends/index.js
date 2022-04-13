/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {css, jsx} from '@emotion/react'
import {Box, Divider, Typography} from '@mui/material'
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore'
import {lazy, Suspense} from 'react'
import {db} from '../../Auth'
import {Progress, styleFlexColumn} from '../layout'
const Users = lazy(() => import('./Users'))

export const Friends = () => (
  <>
    <Box css={styleFlexColumn}>
      <Typography variant="h2" component="h1">
        Friends
      </Typography>
      <Typography variant="h5" component="h2">
        Check all users
      </Typography>
      <Divider />
    </Box>
    <Suspense fallback={<Progress />}>
      <Users />
    </Suspense>
  </>
)

// TODO: to custom hook?
export const streamFriends = (snapshot, error) => {
  const itemsColRef = collection(db, 'users')
  const itemsQuery = query(itemsColRef, orderBy('registerDate', 'desc'))
  return onSnapshot(itemsQuery, snapshot, error)
}
