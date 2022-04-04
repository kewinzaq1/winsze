/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {css, jsx} from '@emotion/react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material'

export const ConfirmationMenu = ({open, onClose, onAgree}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      css={css`
        border-radius: 0.5rem;
      `}
    >
      <DialogTitle
        css={css`
          font-weight: 500;
          font-size: 1.5rem;
        `}
      >
        {'You want to delete your account?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-confirmation-delete-description">
          This is an irreversible process, all data will be lost and all your
          subscriptions will be lost
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAgree} autoFocus>
          Agree
        </Button>
        <Button onClick={onClose} variant="outlined">
          Disagree
        </Button>
      </DialogActions>
    </Dialog>
  )
}
