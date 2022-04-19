/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import {css, jsx} from '@emotion/react'
import {Divider, Stack} from '@mui/material'
import React from 'react'
import {streamFriends} from '.'
import {useStream} from '../../Utils/hooks'
import {User as UserModel} from '../../Utils/models'
import {maxWidth, Progress} from '../Layout/index'
import {User} from './User'

const Users = () => {
  const users: UserModel[] = useStream(streamFriends)

  if (!users) {
    return <Progress />
  }

  return (
    <Stack
      divider={<Divider />}
      css={css`
        max-width: ${maxWidth};
        margin: 0 auto;
        padding-bottom: 56px;
      `}
    >
      {users?.map(({id, nickname, avatar, registerDate}) => (
        <User
          key={id}
          nickname={nickname}
          avatar={avatar}
          registerDate={registerDate}
          id={id}
        />
      ))}
    </Stack>
  )
}

export default Users
