/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {jsx, css} from '@emotion/react'
import {Box, Paper, Typography} from '@mui/material'
import Moment from 'react-moment'
import {myBlue} from '../layout'

export const Post = ({author, description, date, photo} = {}) => {
  return (
    <Paper>
      <Box
        css={css`
          padding: 1rem;
        `}
      >
        <Typography
          variant="subtitle1"
          component="p"
          css={css`
            span {
              background-color: ${myBlue};
              color: #fff;
              border-radius: 0.5rem;
              padding: 0.5rem 1rem;
            }
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
          `}
        >
          <Moment fromNow>{date}</Moment>
          <span>{author}</span>
        </Typography>
        <Typography variant="h5" component="h1">
          {description}
        </Typography>
      </Box>
        {photo && <img src={photo} alt={description} />}
    </Paper>
  )
}
