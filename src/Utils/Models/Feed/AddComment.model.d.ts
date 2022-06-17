import {User} from "firebase/auth";

export interface AddComment {
    postId: string
    user: User
    content: string
}
