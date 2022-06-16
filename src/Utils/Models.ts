import {User as FireAuthUser} from 'firebase/auth'
import React from 'react'
import {UploadResult} from 'firebase/storage'

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

export interface User {
  avatar?: string
  id?: string
  nickname?: string
  registerDate?: string
}

export interface Props {
  children: JSX.Element
}

export interface AuthProps {
  user: FireAuthUser
  setUser: React.Dispatch<React.SetStateAction<FireAuthUser>>
  status: string
  isRegister: boolean
  isAuthenticated: boolean
  isLogin: boolean
  isLoading: boolean
  setStatus: React.Dispatch<React.SetStateAction<string>>
  setLogin: () => void
  setRegister: () => void
  logout: () => Promise<void>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export interface SettingsProps extends Partial<AuthProps> {
  userEmailVerified: boolean
  isOpenConfirmation: boolean
  settings: string
  deleteAccount: () => Promise<void>
  closeAll: () => void
  openUpdatePicture: () => void
  openUpdateUsername: () => void
  openUpdatePassword: () => void
  openUpdateEmail: () => void
  openConfirmation: () => void
  isFormOpen: boolean
  verifyEmail: () => Promise<null | void>
  typeValidation: 'password' | 'file'
  updateNickname: (newName: string) => Promise<null | void>
  updatePassword: (newPassword: string) => Promise<null | void>
  updateEmail: (email: string) => Promise<null | void>
  updatePhoto: (photo: File) => Promise<UploadResult | void>
}
