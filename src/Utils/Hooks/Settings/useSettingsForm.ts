import * as React from 'react'
import {useSettings} from './useSettings'

export const useSettingsForm = () => {
  const {settings, updatePhoto, updateNickname, updatePassword, updateEmail} =
    useSettings()

  const [val, setVal] = React.useState<File | string>('')

  const onSubmit = (submittedVal: string | File) => {
    if (typeof submittedVal === 'object') {
      if (settings === 'picture' && updatePhoto) {
        return updatePhoto(submittedVal)
      }
    } else {
      if (settings === 'nickname' && updateNickname) {
        return updateNickname(submittedVal)
      }
      if (settings === 'password' && updatePassword) {
        return updatePassword(submittedVal)
      }
      if (settings === 'email' && updateEmail) {
        return updateEmail(submittedVal)
      }
    }
  }

  return {
    onSubmit,
    setVal,
    val
  }
}
