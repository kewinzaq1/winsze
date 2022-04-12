/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {jsx, css} from '@emotion/react'
import {LoadingButton} from '@mui/lab'
import {
  Box,
  Dialog,
  Divider,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, {useState} from 'react'
import {addComment} from '..'
import {useAuth} from '../../../Auth'
import {useStatus} from '../../../Utils/hooks'
import {Comment} from './Comment'

export const Comments = ({open, onClose, comments, postId} = {}) => {
  const {user} = useAuth()
  const {setStatus, isError, isLoading} = useStatus()
  const [content, setContent] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    setContent('')
    setStatus('loading')
    addComment(postId, {user, content}).then(
      () => {
        setStatus(null)
      },
      () => {
        setStatus('error')
      },
    )
  }
  const commentOnChange = ({target: {value}}) => setContent(value)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      css={css`
        width: 100%;
      `}
    >
      <Box>
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
          onSubmit={handleSubmit}
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
              className={'123'}
              placeholder="Write a comment"
              value={content}
              onChange={commentOnChange}
              css={css`
                width: 80%;
              `}
            />
            <LoadingButton
              variant="contained"
              loading={isLoading}
              type="submit"
              css={css`
                width: 20%;
              `}
              color={!isError ? 'primary' : 'warning'}
              disabled={!content?.length}
            >
              {!isError ? 'Add' : 'retry'}
            </LoadingButton>
          </FormGroup>
        </form>
      </Box>
      <Divider />
      {Boolean(comments?.length) && (
        <Stack
          css={css`
            max-width: 100%;
          `}
          divider={<Divider />}
        >
          {comments?.sort().map(comment => (
            <Comment
              key={comment}
              comment={comment}
              postId={postId}
              css={css`
                max-width: 100%;
              `}
            />
          ))}
        </Stack>
      )}
    </Dialog>
  )
}
