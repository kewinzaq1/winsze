import {Auth} from '../Auth/Auth.model'

export interface NavbarMenuModel extends Partial<Auth> {
  anchorEl?: HTMLElement
  open: boolean
  handleClose: () => void
}
