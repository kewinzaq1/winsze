/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {jsx, css} from '@emotion/react'
import {Avatar, Box, Paper, Typography} from '@mui/material'
import Moment from 'react-moment'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import {myBlue} from '../layout'

const Post = ({author, description, date, photo, avatar} = {}) => {
  return (
    <Paper>
      <Box
        css={css`
          padding: 2rem;
          gap: 1.25rem;
          display: flex;
          flex-direction: column;
        `}
      >
        <Box
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <Box
            css={css`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `}
          >
            <Avatar
              variant="rounded"
              sizes="large"
              src={avatar && null}
              alt={author}
              css={css`
                background-color: ${myBlue};
                width: 45px;
                height: 45px;
              `}
            >
              {!avatar && author[0]}
            </Avatar>
            <Box>
              <Typography variant="subtitle2">
                <Moment fromNow>{date}</Moment>
              </Typography>
              <Typography
                variant="h5"
                component="p"
                css={css`
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  gap: 1rem;
                `}
              >
                @{author}
              </Typography>
            </Box>
          </Box>
          <Box>
            <MoreHorizIcon
              css={css`
                cursor: pointer;
                align-self: flex-start;
              `}
            />
          </Box>
        </Box>
        <Typography variant="h4" component="h1">
          {description}
        </Typography>
      </Box>
      {photo && <img src={photo} alt={description} />}
    </Paper>
  )
}

export default Post
