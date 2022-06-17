import * as React from 'react'

export const useLocalStorageState = (name: string, initValue: unknown) => {
  const getValueFromLocalStorage = window.localStorage.getItem(name)

  const [state, setState] = React.useState(
    getValueFromLocalStorage ? JSON.parse(getValueFromLocalStorage) : initValue
  )

  React.useEffect(() => {
    if (state) {
      window.localStorage.setItem(name, JSON.stringify(state))
    } else {
      window.localStorage.removeItem(name)
    }
  }, [name, state])

  return [state, setState]
}
