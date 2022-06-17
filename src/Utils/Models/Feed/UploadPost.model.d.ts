import {User} from "firebase/auth";

export interface UploadPost {
    user: User
    desc: string
    photo?: File
}
