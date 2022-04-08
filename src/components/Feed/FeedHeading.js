/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {css} from '@emotion/react'
import {FormGroup, Input, InputLabel, Paper, Typography} from '@mui/material'
import React, {useState} from 'react'
import styled from '@emotion/styled'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import ClearIcon from '@mui/icons-material/Clear'
import {alertRed} from '../layout'
import {uploadPost} from '.'
import {useAuth} from '../../Auth'
import LoadingButton from '@mui/lab/LoadingButton'

export const FeedHeading = () => {
  const {user} = useAuth()
  const [photo, setPhoto] = useState(null)
  const [preview, setPreview] = useState(null)
  const [desc, setDesc] = useState('')
  const [status, setStatus] = useState(null)

  const isLoading = status === 'loading'
  const isError = status === 'error'

  const onPhotoChange = ({target}) => {
    setPreview(URL.createObjectURL(target.files[0]))
    setPhoto(target.files[0])
  }

  const onDescChange = ({target}) => {
    setDesc(target.value)
  }

  const removePhoto = () => {
    setPhoto(null)
    setPreview(null)
  }

  const valid = !desc?.length

  const clearAll = () => {
    setPhoto(null)
    setPreview(null)
    setDesc('')
  }

  const submitPost = e => {
    setStatus('loading')
    e.preventDefault()
    uploadPost(user, desc, photo)
      .then(() => {
        setStatus(null)
        clearAll()
        e.target.blur()
      })
      .catch(e => {
        setStatus('error')
      })
  }

  // TODO add confirmation change page (lost currently write post)
  return (
    <Paper
      css={css`
        flex-direction: row;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: nowrap;
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 1rem;
        height: max-content;
      `}
      elevation={2}
    >
      <Form onSubmit={submitPost}>
        <Typography variant="h4" component="h1" fontWeight={500}>
          Share this with your friends
        </Typography>
        <FormGroup
          css={css`
            height: 100%;
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            padding: 0.5rem 0;
          `}
        >
          <Input
            id="feed-input"
            name="feed-input"
            placeholder="What's up?"
            value={desc}
            onChange={onDescChange}
            disableUnderline
            css={css`
              height: 100px;
              padding: 55px 0 0 0;
              padding-left: 0.5rem;
              padding-right: 0.5rem;
              width: 70%;
              border-radius: 0.5rem;
            `}
          />
          {photo ? (
            <ClearIcon
              onClick={removePhoto}
              css={css`
                fill: ${alertRed};
                cursor: pointer;
                justify-content: flex-start;
                align-items: flex-start;
              `}
            />
          ) : (
            <InputLabel htmlFor="add-photo-feed">
              <AddAPhotoIcon />
            </InputLabel>
          )}
        </FormGroup>
        <Input
          type="file"
          id="add-photo-feed"
          name="add-photo-feed"
          css={css`
            display: none;
          `}
          value={photo?.[0]}
          onChange={onPhotoChange}
        />
        {preview && (
          <Paper
            css={css`
              position: relative;
              width: 100%;

              img {
                border-radius: 0.5rem;
              }
            `}
          >
            <img src={preview} alt={photo.name} />
          </Paper>
        )}
        <LoadingButton
          type="submit"
          variant="contained"
          css={css`
            width: 100%;
          `}
          disabled={valid}
          loading={isLoading}
          error={toString(isError)}
        >
          Feed
        </LoadingButton>
      </Form>
    </Paper>
  )
}

const Form = styled.form`
  width: 90%;
  margin: 0 auto;
  gap: 2rem;
`
