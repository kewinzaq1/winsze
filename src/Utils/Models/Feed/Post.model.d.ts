export interface Post {
  id: string
  authorId: string
  date: string
  author: string
  avatar?: string
  description: string
  photo?: string
  likes?: number
  usersWhoLiked?: string[]
  comments?: []
}
