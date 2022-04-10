import {collection, onSnapshot, orderBy, query} from 'firebase/firestore'
import {db} from '../../Auth'

export const streamFriends = (snapshot, error) => {
  const itemsColRef = collection(db, 'users')
  const itemsQuery = query(itemsColRef, orderBy('registerDate', 'desc'))
  return onSnapshot(itemsQuery, snapshot, error)
}
