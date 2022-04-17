export interface Posts {
  id: string
  authorId: string
  date: string
  author: string
  avatar?: string
  description: string
  photo: string
  likes?: number
  usersWhoLiked?: []
  comments?: []
}

export interface Users {
  avatar?: string
  id: string
  nickname: string
  registerDate: string
}
