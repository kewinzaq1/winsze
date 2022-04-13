/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {css, jsx} from '@emotion/react'
import {Avatar, Box, Card, Typography} from '@mui/material'
import React from 'react'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'
import {useAuth} from '../../Auth'

export const User = ({nickname, email, avatar, registerDate, id}) => {
  const {user} = useAuth()

  return (
    <Card
      elevation={0}
      css={css`
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0 1rem;
      `}
    >
      {avatar ? (
        <Avatar
          variant="rounded"
          src={avatar}
          alt={nickname}
          css={css`
            width: 50px;
            height: 50px;
          `}
        />
      ) : (
        <Avatar
          variant="rounded"
          css={css`
            width: 50px;
            height: 50px;
          `}
        >
          {nickname?.[0]}
        </Avatar>
      )}
      <Box>
        <Typography variant="h4" component="h1">
          <Link to={id}>
            {user.displayName === nickname ? 'You' : `@${nickname}`}
          </Link>
        </Typography>
        <Typography variant="subtitle1" component="p">
          On winsze:{' '}
          <b>
            <Moment toNow ago>
              {registerDate}
            </Moment>
          </b>
        </Typography>
      </Box>
    </Card>
  )
}
