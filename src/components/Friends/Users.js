/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {css, jsx} from '@emotion/react'
import {Divider, Stack} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {streamFriends} from '.'
import {Progress} from '../layout'
import {User} from './User'

const Users = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    const unsubscribe = streamFriends(
      querySnapshot => {
        const updatedFriend = querySnapshot.docs.map(docSnapshot =>
          docSnapshot.data(),
        )
        setUsers(updatedFriend)
      },
      error => console.error(error.message),
    )
    return unsubscribe
  }, [])

  if (!users) {
    return <Progress />
  }

  return (
    <Stack divider={<Divider />}>
      {users.map(({id, displayName, email, photoURL, registerDate}) => (
        <User
          key={id}
          nickname={displayName}
          email={email}
          photoURL={photoURL}
          registerDate={registerDate}
        />
      ))}
    </Stack>
  )
}

export default Users
