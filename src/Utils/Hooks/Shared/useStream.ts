import {useEffect, useState} from 'react'
import {useStatus} from './useStatus'
import {DocumentSnapshot, QuerySnapshot} from 'firebase/firestore'

export const useStream = (streamFn: unknown) => {
  const [streamData, setStreamData] = useState<any>()
  const {setStatus} = useStatus()

  useEffect(() => {
    if (typeof streamFn === 'function') {
      const unsubscribe = streamFn(
        (querySnapshot: QuerySnapshot) => {
          const updatedData = querySnapshot.docs.map(
            (docSnapshot: DocumentSnapshot) => docSnapshot.data()
          )
          setStreamData(updatedData)
        },
        () => setStatus('error')
      )
      return unsubscribe
    }
  }, [setStatus, streamFn])

  return streamData
}
