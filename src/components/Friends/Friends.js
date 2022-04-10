import {Divider, Stack} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {streamFriends} from '.'
import {maxWidth, Progress} from '../layout'
import {User} from './User'

export const Friends = () => {
  const [friends, setFriends] = useState(null)

  useEffect(() => {
    const unsubscribe = streamFriends(
      querySnapshot => {
        const updatedFriend = querySnapshot.docs.map(docSnapshot =>
          docSnapshot.data(),
        )
        setFriends(updatedFriend)
      },
      error => console.error(error.message),
    )
    return unsubscribe
  }, [])

  if (!friends) {
    return <Progress />
  }

  return (
    <Stack divider={<Divider />} maxWidth={maxWidth}>
      {friends.map(({id, displayName, email, photoURL, registerDate}) => (
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
