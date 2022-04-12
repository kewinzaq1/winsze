import {render} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from '../Auth'

export const renderLayout = (ui, {user} = {}) => {
  const Wrapper = ({children}) => (
    <BrowserRouter>
      <AuthProvider initUser={user}>{children}</AuthProvider>
    </BrowserRouter>
  )

  return render(ui, {wrapper: Wrapper})
}
