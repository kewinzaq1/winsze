import * as React from 'react'
import {useAuth} from '../../../Auth'
import toast from 'react-hot-toast'
import {uploadPost} from '../../../Components/Feed'

export const useFeed = () => {
  const {user} = useAuth()
  const [photo, setPhoto] = React.useState<File>()
  const [preview, setPreview] = React.useState<string>('')
  const [desc, setDesc] = React.useState<string>('')
  const [status, setStatus] = React.useState<string>('')

  const isLoading = status === 'loading'

  const onPhotoChange = ({
    target: {files}
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!files) {
      return
    }
    console.log(files[0])
    setPreview(URL.createObjectURL(files[0]))
    setPhoto(files[0])
  }

  const onDescChange = ({
    target: {value}
  }: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(value)
  }

  const removePhoto = () => {
    setPhoto(undefined)
    setPreview('')
  }

  const valid = !desc?.length

  const clearAll = () => {
    setPhoto(undefined)
    setPreview('')
    setDesc('')
  }

  const submitPost = async (
    e: React.ChangeEvent<HTMLFormElement> & React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    scrollToButton(e.target.offsetHeight)
    setStatus('loading')
    await toast.promise(uploadPost({user, desc, photo}), {
      loading: 'Adding',
      success: () => {
        setStatus('')
        clearAll()
        return 'Added'
      },
      error: () => {
        setStatus('error')
        return 'Try again'
      }
    })
  }

  const scrollToButton = (height: number) => {
    window.scrollTo({
      top: height,
      behavior: 'smooth'
    })
  }

  return {
    isLoading,
    photo,
    valid,
    preview,
    desc,
    onPhotoChange,
    onDescChange,
    removePhoto,
    submitPost
  }
}
