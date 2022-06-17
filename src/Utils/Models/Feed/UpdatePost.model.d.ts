export interface UpdatePost {
    id: string
    editPhotoFile?: File
    originalPhoto?: string
    isPhotoChanged: boolean
    overwrites?: object
}
