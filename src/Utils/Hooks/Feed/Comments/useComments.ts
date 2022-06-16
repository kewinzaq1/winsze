import {useAuth} from '../../../../Auth'
import * as React from 'react'
import toast from 'react-hot-toast'
import {addComment} from '../../../../Components/Feed'

export const useComments = (postId: string) => {
  const {user} = useAuth()
  const [content, setContent] = React.useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContent('')
    await toast.promise(addComment({postId, user, content}), {
      loading: 'Adding',
      success: 'Added',
      error: 'Try again'
    })
  }
  const commentOnChange = ({
    target: {value: content}
  }: React.ChangeEvent<HTMLInputElement>) => setContent(content)

  return {
    content,
    handleSubmit,
    commentOnChange
  }
}
