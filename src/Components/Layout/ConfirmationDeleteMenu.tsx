/** @jsxImportSource @emotion/react */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {css} from '@emotion/react'
import * as React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import {ConfirmationDeleteMenuModel} from '../../Utils/Models/Layout/ConfirmationDeleteMenu.model'

export const ConfirmationDeleteMenu = ({
  deleteItem,
  open,
  onClose,
  onAgree
}: ConfirmationDeleteMenuModel) => {
  return (
    <Dialog
      open={open ?? false}
      onClose={onClose}
      css={css`
        border-radius: 0.5rem;
      `}
    >
      <DialogTitle
        css={css`
          font-weight: 500;
          font-size: 2rem;
          line-height: 1.5;
        `}
      >
        {`You want to delete ${deleteItem}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-confirmation-delete-description">
          This is an irreversible process, all data will be lost
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAgree} autoFocus aria-label="accept confirmation">
          Agree
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          aria-label="disagree confirmation"
        >
          Disagree
        </Button>
      </DialogActions>
    </Dialog>
  )
}
