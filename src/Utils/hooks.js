import {useEffect, useState} from 'react'

function useOverflowHidden() {}

function useLocalStorageState(name, initValue = null) {
  const getValueFromLocalStorage = window.localStorage.getItem(name)

  const [state, setState] = useState(
    name !== 'undefined' ? JSON.parse(getValueFromLocalStorage) : null,
  )

  useEffect(() => {
    window.localStorage.setItem(name, JSON.stringify(state))
  }, [name, state])

  return [state, setState]
}

export {useOverflowHidden, useLocalStorageState}
