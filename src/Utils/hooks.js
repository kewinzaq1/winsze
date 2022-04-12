import {useEffect, useState} from 'react'

const useOverflowHidden = () => {
  return useEffect(() => {
    document.querySelector('body').style.overflow = 'hidden'
    return () => {
      document.querySelector('body').style.overflow = 'visible'
    }
  }, [])
}

const useLocalStorageState = (name, initValue = '') => {
  const getValueFromLocalStorage = window.localStorage.getItem(name)
  const [state, setState] = useState(getValueFromLocalStorage ?? initValue)

  useEffect(() => {
    window.localStorage.setItem(name, JSON.stringify(state))
  }, [name, state])

  return [state, setState]
}

const useStatus = () => {
  const [status, setStatus] = useState(null)

  const isSuccess = status === null
  const isError = status === 'error'
  const isLoading = status === 'loading'

  return {status, setStatus, isSuccess, isError, isLoading}
}

export {useOverflowHidden, useLocalStorageState, useStatus}
