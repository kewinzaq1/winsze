import {useEffect, useState} from 'react'

const useOverflowHidden = () => {
  return useEffect(() => {
    document.querySelector('body').style.overflow = 'hidden'
    return () => {
      document.querySelector('body').style.overflow = 'visible'
    }
  }, [])
}

const useLocalStorageState = (name, initValue = null) => {
  const getValueFromLocalStorage = window.localStorage.getItem(name)

  const [state, setState] = useState(
    JSON.parse(getValueFromLocalStorage) ?? initValue,
  )

  useEffect(() => {
    if (state) {
      window.localStorage.setItem(name, JSON.stringify(state))
    } else {
      window.localStorage.removeItem(name)
    }
  }, [name, state])

  return [state, setState]
}

const useStatus = (initStatus = null) => {
  const [status, setStatus] = useState(initStatus)

  const isSuccess = status === null
  const isError = status === 'error'
  const isLoading = status === 'loading'

  return {status, setStatus, isSuccess, isError, isLoading}
}

const useStream = streamFn => {
  const [streamData, setStreamData] = useState(null)
  const {setStatus, isError} = useStatus()

  useEffect(() => {
    const unsubscribe = streamFn(
      querySnapshot => {
        const updatedData = querySnapshot.docs.map(docSnapshot =>
          docSnapshot.data(),
        )
        setStreamData(updatedData)
      },
      error => setStatus('error'),
    )
    return unsubscribe
  }, [setStatus, streamFn])

  return {streamData, isError}
}

export {useOverflowHidden, useLocalStorageState, useStatus, useStream}
