/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {css, jsx} from '@emotion/react'
import {Divider, Stack} from '@mui/material'
import React from 'react'
import {streamFriends} from '.'
import {useStream} from '../../Utils/hooks'
import {maxWidth, Progress} from '../layout'
import {User} from './User'

const Users = () => {
  const {streamData: users} = useStream(streamFriends)

  if (!users) {
    return <Progress />
  }

  return (
    <Stack
      divider={<Divider />}
      css={css`
        max-width: ${maxWidth};
        margin: 0 auto;
      `}
      disabledPadding
    >
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
