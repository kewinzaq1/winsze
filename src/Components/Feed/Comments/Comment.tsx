/** @jsxImportSource @emotion/react */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {css} from '@emotion/react'
import * as React from 'react'
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Moment from 'react-moment'
import {useAuth} from '../../../Auth'
import {removeComment} from '..'
import toast from 'react-hot-toast'
import {alertRed} from '../../Layout/LayoutStyles'
import {CommentModel} from '../../../Utils/Models/Feed/Comments/Comment.model'

export const Comment = ({comment, postId}: CommentModel) => {
  const {user} = useAuth()
  const {authorId, date, authorNickname, authorAvatar, content} =
    JSON.parse(comment)

  const handleRemove = () => {
    toast.promise(
      removeComment({postId, comment}),
      {
        loading: 'Removing',
        success: 'Removed',
        error: 'Try again'
      },
      {
        success: {
          icon: '❌'
        }
      }
    )
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar variant="rounded" src={authorAvatar}>
          {!authorAvatar && authorNickname[0]}
        </Avatar>
      </ListItemAvatar>
      <Box
        css={css`
          width: 100%;
        `}
      >
        <ListItemText
          primary={authorId === user?.uid ? 'You' : authorNickname}
          secondary={<Moment fromNow>{date}</Moment>}
        />
        <Typography
          variant="subtitle1"
          component="p"
          css={css`
            word-break: break-all;
          `}
        >
          {content}
        </Typography>
      </Box>
      {user?.uid === authorId && (
        <Button
          aria-label="remove comment"
          onClick={handleRemove}
          css={css`
            align-items: center;
            display: flex;
            justify-content: center;
          `}
        >
          <CloseIcon
            css={css`
              cursor: pointer;
              color: ${alertRed};
            `}
          />
        </Button>
      )}
    </ListItem>
  )
}
