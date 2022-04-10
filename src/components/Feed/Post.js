/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {jsx, css} from '@emotion/react'
import {useState} from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  Popover,
  TextField,
  Typography,
  InputLabel,
  Input,
} from '@mui/material'
import Moment from 'react-moment'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import {myBlue, alertRed, padEl} from '../layout'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import styled from '@emotion/styled'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import CloseIcon from '@mui/icons-material/Close'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import NoPhotographyIcon from '@mui/icons-material/NoPhotography'
import {removePost, updatePost} from '.'
import {useAuth} from '../../Auth'
import {ConfirmationDeleteMenu} from '../layout/ConfirmationDeleteMenu'

const Post = ({
  author,
  description,
  date,
  photo: originalPhoto,
  avatar,
  id,
  authorId,
} = {}) => {
  const {
    user: {uid: userId},
  } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [desc, setDesc] = useState(description)
  const [editPhotoFile, setEditPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(originalPhoto)
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setIsEdit(false)
    setIsOpenConfirmation(false)
  }

  const open = Boolean(anchorEl)

  const editPost = () => {
    setAnchorEl(null)
    setIsEdit(true)
  }

  const onPhotoChange = ({target: {files}}) => {
    setPhotoPreview(URL.createObjectURL(files[0]))
    setEditPhotoFile(files[0])
  }
  const cancelEdit = () => {
    setDesc(description)
    setIsEdit(false)
    setPhotoPreview(originalPhoto)
  }

  const removePhoto = () => {
    setPhotoPreview(null)
    setEditPhotoFile(null)
  }

  const uploadChanges = async e => {
    e.preventDefault()
    const overrides = {
      description: desc,
      date: `${new Date().toISOString()}`,
    }
    await updatePost(id, {editPhotoFile, originalPhoto, overrides})
    handleClose()
  }

  return (
    <>
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
            {isEdit ? (
              photoPreview ? (
                <IconButton
                  onClick={removePhoto}
                  aria-label="leave changes"
                  component="span"
                  css={css`
                    color: ${alertRed};
                  `}
                >
                  <NoPhotographyIcon />
                </IconButton>
              ) : (
                <IconButton
                  css={css`
                    position: relative;
                  `}
                >
                  <InputLabel htmlFor="add-photo-post">
                    <AddAPhotoIcon
                      css={css`
                        color: ${myBlue};
                      `}
                    />
                  </InputLabel>
                  <Input
                    type="file"
                    id="add-photo-post"
                    name="add-photo-post"
                    css={css`
                      display: none;
                    `}
                    value={editPhotoFile?.[0]}
                    onChange={onPhotoChange}
                  />
                </IconButton>
              )
            ) : (
              userId === authorId && (
                <Box>
                  <MoreHorizIcon
                    onClick={handleClick}
                    role={'button'}
                    css={css`
                      cursor: pointer;
                      align-self: flex-start;
                    `}
                  />
                  <Popover
                    css={css`
                      border-radius: 0.5rem;
                    `}
                    id={'action-post-popover'}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    elevation={2}
                  >
                    <List>
                      <ListItem onClick={editPost}>
                        <Button
                          size={'small'}
                          css={css`
                            color: #2b2b2b;
                          `}
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button>
                      </ListItem>
                      <ListItem>
                        <Button
                          size={'small'}
                          css={css`
                            color: #2b2b2b;
                          `}
                          startIcon={<DeleteIcon />}
                          onClick={() => setIsOpenConfirmation(true)}
                        >
                          Delete
                        </Button>
                      </ListItem>
                    </List>
                  </Popover>
                </Box>
              )
            )}
          </Box>
          {isEdit ? (
            <Form onSubmit={uploadChanges}>
              <TextField
                css={css``}
                fullWidth
                value={desc}
                onChange={({target: {value}}) => setDesc(value)}
              />
              <IconButton
                onClick={cancelEdit}
                color="error"
                aria-label="leave changes"
                component="span"
                type="button"
              >
                <CloseIcon />
              </IconButton>
              <IconButton
                onClick={uploadChanges}
                color="primary"
                aria-label="upload changes"
                component="span"
                role="button"
              >
                <SaveAsIcon />
              </IconButton>
            </Form>
          ) : (
            <Typography variant="h4" component="h1">
              {description}
            </Typography>
          )}
        </Box>
        {photoPreview && (
          <img
            src={photoPreview}
            alt={description}
            css={css`
              width: 100%;
            `}
          />
        )}
      </Card>
      <ConfirmationDeleteMenu
        onAgree={() => removePost(id)}
        onClose={handleClose}
        open={isOpenConfirmation}
        deleteItem="post"
      />
    </>
  )
}

export default Post

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
