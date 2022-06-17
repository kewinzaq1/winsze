import {useState} from 'react'

const useStatus = (initStatus?: string) => {
  const [status, setStatus] = useState<string>(initStatus ?? '')

  const isSuccess = status === ''
  const isError = status === 'error'
  const isLoading = status === 'loading'

  return {status, setStatus, isSuccess, isError, isLoading}
}
export {useStatus}
