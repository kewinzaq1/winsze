/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {jsx, css} from '@emotion/react'
import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import {alertRed} from '../../layout'
import Moment from 'react-moment'
import {useAuth} from '../../../Auth'
import {removeComment} from '..'
import {LoadingButton} from '@mui/lab'
import {useStatus} from '../../../Utils/hooks'

export const Comment = ({comment, postId}) => {
  const {user} = useAuth()
  const {id, authorId, date, authorNickname, authorAvatar, content} =
    JSON.parse(comment)
  const {setStatus, isLoading} = useStatus()

  const handleRemove = () => {
    setStatus('loading')
    removeComment(postId, id, {comment}).then(
      () => {
        setStatus(null)
      },
      () => {
        setStatus('error')
      },
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
          primary={authorId === user.uid ? 'You' : authorNickname}
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
      {user.uid === authorId && (
        <LoadingButton
          loading={isLoading}
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
        </LoadingButton>
      )}
    </ListItem>
  )
}
