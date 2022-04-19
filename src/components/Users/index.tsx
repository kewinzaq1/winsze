/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {css, jsx} from '@emotion/react'
import React from 'react'
import {Box, Divider, Typography} from '@mui/material'
import {
  collection,
  DocumentData,
  FirestoreError,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  SnapshotListenOptions,
} from 'firebase/firestore'
import {lazy, Suspense} from 'react'
import {db} from '../../Auth/index'
import {Progress, styleFlexColumn} from '../Layout/index'
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

export const streamFriends = (
  snapshot: SnapshotListenOptions,
  error: {
    next?: (snapshot: QuerySnapshot<DocumentData>) => void
    error?: (error: FirestoreError) => void
    complete?: () => void
  },
) => {
  const itemsColRef = collection(db, 'users')
  const itemsQuery = query(itemsColRef, orderBy('registerDate', 'desc'))
  return onSnapshot(itemsQuery, snapshot, error)
}
