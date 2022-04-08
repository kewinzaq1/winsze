/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {jsx, css} from '@emotion/react'
import {Avatar, Box, Card, Paper, Typography} from '@mui/material'
import Moment from 'react-moment'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import {myBlue, padEl} from '../layout'

// TODO: add popover with functionality 1.Edit post, 2.Remove post

const Post = ({author, description, date, photo, avatar} = {}) => {
  return (
    <Card elevation={0}>
      <Box
        css={css`
          padding: ${padEl};
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
            {avatar ? (
              <Avatar
                variant="rounded"
                sizes="large"
                src={avatar}
                alt={author}
                css={css`
                  width: 45px;
                  height: 45px;
                `}
              />
            ) : (
              <Avatar
                variant="rounded"
                sizes="large"
                alt={author}
                css={css`
                  background-color: ${myBlue};
                  width: 45px;
                  height: 45px;
                `}
              >
                {author[0]}
              </Avatar>
            )}
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
    </Card>
  )
}

export default Post
