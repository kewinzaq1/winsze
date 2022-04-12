/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {jsx, css} from '@emotion/react'
import {LoadingButton} from '@mui/lab'
import {
  Dialog,
  DialogTitle,
  Divider,
  FormGroup,
  Input,
  List,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import React, {useState} from 'react'
import {addComment} from '..'
import {useAuth} from '../../../Auth'
import {Comment} from './Comment'

export const Comments = ({open, onClose, comments, postId} = {}) => {
  const {user} = useAuth()
  const [status, setStatus] = useState(null)
  const [content, setContent] = useState('')

  const isLoading = status === 'loading'
  const isError = status === 'error'

  return (
    <Dialog
      open={open}
      onClose={onClose}
      css={css`
        width: 100%;
      `}
    >
      <Typography
        variant="h5"
        component="h1"
        css={css`
          padding: 1rem;
        `}
      >
        {comments?.length
          ? `${comments?.length} Comments:`
          : 'Write first comment '}
      </Typography>
      <form
        css={css`
          width: 100%;
        `}
        onSubmit={e => {
          e.preventDefault()
          setStatus('loading')
          addComment(postId, {user, content}).then(
            () => {
              setStatus(null)
              setContent('')
            },
            () => {
              setStatus('error')
            },
          )
        }}
      >
        <FormGroup
          css={css`
            flex-direction: row;
            justify-content: space-between;
            padding: 1rem;
            gap: 0.25rem;
            width: 100%;
            flex-wrap: nowrap;
          `}
        >
          <TextField
            placeholder="Write a comment"
            value={content}
            onChange={({target: {value}}) => setContent(value)}
            css={css`
              width: 80%;
            `}
          />
          <LoadingButton
            variant="contained"
            loading={isLoading}
            type="submit"
            error={isError}
            css={css`
              width: 20%;
            `}
          >
            Add
          </LoadingButton>
        </FormGroup>
      </form>
      <Divider />
      {comments?.length ? (
        <List
          css={css`
            max-width: 100%;
          `}
        >
          {comments?.sort().map(comment => {
            return (
              <>
                <Comment
                  key={comment.id}
                  comment={comment}
                  postId={postId}
                  css={css`
                    max-width: 100%;
                  `}
                />
                <Divider />
              </>
            )
          })}
          <Divider />
        </List>
      ) : null}
    </Dialog>
  )
}
