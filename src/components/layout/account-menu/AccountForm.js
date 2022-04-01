/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react'
import {
  FormGroup,
  InputLabel,
  Input,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import styled from '@emotion/styled'

export const AccountForm = ({label, placeholder, type = 'text', onSubmit}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-confirmation-delete-title"
      aria-describedby="alert-confirmation-delete-description"
    >
      <DialogTitle
        id="alert-confirmation-delete-title"
        css={css`
          font-weight: 500;
          font-size: 1.5rem;
        `}
      >
        {'You want to delete your account?'}
      </DialogTitle>
      <DialogContent>
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <InputLabel>{label}</InputLabel>
            <Input type={type} />
            <Button type="submit">Update</Button>
          </FormGroup>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const Form = styled.form``
