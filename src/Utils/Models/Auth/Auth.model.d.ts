import {User as FireAuthUser} from '@firebase/auth'
import React from 'react'

export interface Auth {
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
