/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import {css} from '@emotion/react'
import * as React from 'react'
import {Divider, Stack} from '@mui/material'
import {streamFriends} from '.'
import {User} from './User'
import {Progress} from '../Layout/Progress'
import {maxWidth} from '../Layout/LayoutStyles'
import {useStream} from '../../Utils/Hooks/Shared/useStream'
import {User as UserModel} from '../../Utils/Models/User/User.model'

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
