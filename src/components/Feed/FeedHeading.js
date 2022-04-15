/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {css} from '@emotion/react'
import {
  Card,
  Divider,
  FormGroup,
  Input,
  InputLabel,
  Typography,
} from '@mui/material'
import React, {useState} from 'react'
import styled from '@emotion/styled'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import ClearIcon from '@mui/icons-material/Clear'
import {alertRed} from '../Layout'
import {uploadPost} from '.'
import {useAuth} from '../../Auth'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'
import toast from 'react-hot-toast'

export const FeedHeading = ({disableTitle} = {}) => {
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
    e.preventDefault()
    scrollToButton(e)
    setStatus('loading')
    toast.promise(uploadPost(user, desc, photo), {
      loading: 'Adding',
      success: () => {
        setStatus(null)
        clearAll()
        return 'Added'
      },
      error: () => {
        setStatus('error')
        return 'Try again'
      },
    })
  }

  const scrollToButton = e => {
    window.scrollTo({
      top: e.target.offsetHeight,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <Card
        css={css`
          flex-direction: row;
          justify-content: space-between;
          flex-wrap: nowrap;
          padding: 2rem 1rem 1rem 1rem;
          gap: 1rem;
          border-radius: 0.5rem;
        `}
        elevation={0}
      >
        <Form onSubmit={submitPost}>
          {!disableTitle && (
            <Typography variant="h2" component="h1">
              Share with friends
            </Typography>
          )}
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
            <Card
              css={css`
                position: relative;
                width: 100%;

                img {
                  border-radius: 0.5rem;
                }
              `}
            >
              <img
                src={preview}
                alt={photo.name}
                css={css`
                  width: 100%;
                `}
              />
            </Card>
          )}
          <LoadingButton
            type="submit"
            variant="contained"
            css={css`
              width: 100%;
              padding: 0.75rem 0;
            `}
            disabled={valid}
            loading={isLoading}
            error={toString(isError)}
            endIcon={<SendIcon />}
          >
            <b>Publish</b>
          </LoadingButton>
        </Form>
      </Card>
      <Divider />
    </>
  )
}

const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  gap: 2rem;
`
