export interface CommentsModel {
  open: boolean
  onClose?: () => void
  comments?: string[]
  postId: string
}
