import * as React from 'react'
import {useAuth} from '../../../Auth'
import toast from 'react-hot-toast'
import {removePost, toggleLike, updatePost} from '../../../Components/Feed'
import {Post as ModelPost} from '../../Models'

export const usePost = ({
  description,
  photo: originalPhoto,
  id,
  usersWhoLiked
}: ModelPost) => {
  const {user} = useAuth()
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>()
  const [isEdit, setIsEdit] = React.useState(false)
  const [desc, setDesc] = React.useState(description)
  const [editPhotoFile, setEditPhotoFile] = React.useState<File>()
  const [photoPreview, setPhotoPreview] = React.useState(originalPhoto)
  const [isOpenConfirmation, setIsOpenConfirmation] = React.useState(false)
  const [isLiked, setIsLiked] = React.useState(
    user && usersWhoLiked?.includes(user?.uid)
  )
  const [isOpenComment, setIsOpenComment] = React.useState(false)
  const isPhotoChanged = originalPhoto !== photoPreview

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(undefined)
    setIsEdit(false)
    setIsOpenConfirmation(false)
  }

  const open = Boolean(anchorEl)

  const editPost = () => {
    setAnchorEl(undefined)
    setIsEdit(true)
  }

  const onPhotoChange = ({
    target: {files}
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files) {
      setPhotoPreview(URL.createObjectURL(files[0]))
      setEditPhotoFile(files[0])
    }
  }
  const cancelEdit = () => {
    setDesc(description)
    setIsEdit(false)
    setPhotoPreview(originalPhoto)
  }

  const removePhoto = () => {
    setPhotoPreview('')
    setEditPhotoFile(undefined)
  }

  const uploadChanges = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    handleClose()
    const overwrites = {
      description: desc,
      date: `${new Date().toISOString()}`
    }

    await toast.promise(
      updatePost({
        id,
        editPhotoFile,
        originalPhoto,
        isPhotoChanged,
        overwrites
      }),
      {
        loading: 'Updating',
        success: 'Updated',
        error: 'Try again'
      }
    )
  }

  const handleDelete = async () => {
    await toast.promise(
      removePost(id, originalPhoto),
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

  const handleLike = async () => {
    setIsLiked(!isLiked)
    await toggleLike({id, isLiked, userId: user.uid})
  }

  const closeConfirmation = () => setIsOpenComment(false)

  return {
    open,
    isOpenComment,
    setIsOpenComment,
    handleClick,
    handleClose,
    editPost,
    onPhotoChange,
    cancelEdit,
    removePhoto,
    uploadChanges,
    handleDelete,
    handleLike,
    closeConfirmation,
    user,
    anchorEl,
    setAnchorEl,
    isEdit,
    setIsEdit,
    desc,
    setDesc,
    editPhotoFile,
    setEditPhotoFile,
    photoPreview,
    setPhotoPreview,
    isOpenConfirmation,
    setIsOpenConfirmation,
    isLiked,
    setIsLiked,
    isPhotoChanged
  }
}
