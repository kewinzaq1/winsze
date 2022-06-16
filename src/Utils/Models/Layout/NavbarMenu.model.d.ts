import {AuthProps} from '../../Models'

export interface NavbarMenuModel extends Partial<AuthProps> {
  anchorEl?: HTMLElement
  open: boolean
  handleClose: () => void
}
