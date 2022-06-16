import {render as rtlRender} from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from '../Auth'
import {RenderLayout} from './Models/Tests/RenderLayout.model'

export const render = ({ui, user}: RenderLayout) => {
  const wrapper = ({children}: {children: JSX.Element}) => (
    <BrowserRouter>
      <AuthProvider initUser={user}>{children}</AuthProvider>
    </BrowserRouter>
  )

  if (!ui) {
    return null
  }

  return rtlRender(ui, {wrapper})
}
