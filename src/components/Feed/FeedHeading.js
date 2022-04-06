/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {css, jsx} from '@emotion/react'
import {
  Button,
  FormGroup,
  Input,
  InputLabel,
  Paper,
  Typography,
} from '@mui/material'
import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt'
import {alertRed} from '../layout'

export const FeedHeading = () => {
  const [photo, setPhoto] = useState(null)
  const [preview, setPreview] = useState(null)
  const [desc, setDesc] = React.useState('')

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
      `}
      elevation="2"
    >
      <Form>
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
            <DoDisturbAltIcon
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
            elevation="0"
          >
            <img src={preview} alt={photo.name} />
          </Paper>
        )}
      </Form>
    </Paper>
  )
}

const Form = styled.form`
  width: 90%;
  margin: 0 auto;
  gap: 2rem;
`
