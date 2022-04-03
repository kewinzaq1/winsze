import {useEffect, useState} from 'react'

function useOverflowHidden() {
  return useEffect(() => {
    document.querySelector('body').style.overflow = 'hidden'
    return () => {
      document.querySelector('body').style.overflow = 'visible'
    }
  }, [])
}

function useLocalStorageState(name, {initValue} = {}) {
  const getValueFromLocalStorage = window.localStorage.getItem(name)

  const [state, setState] = useState(
    name !== 'undefined'
      ? JSON.parse(getValueFromLocalStorage)
      : initValue ?? null,
  )

  useEffect(() => {
    window.localStorage.setItem(name, JSON.stringify(state))
  }, [name, state])

  return [state, setState]
}

export {useOverflowHidden, useLocalStorageState}
