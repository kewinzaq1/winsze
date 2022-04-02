/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react'
import {useState} from 'react'
import {
  FormGroup,
  InputLabel,
  Input,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material'
import styled from '@emotion/styled'

export const AccountForm = ({
  open,
  onClose,
  label,
  placeholder,
  type = 'text',
  onSubmit,
} = {}) => {
  const [val, setVal] = useState('')

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose()
        setVal('')
      }}
      aria-labelledby="alert-confirmation-update-title"
      aria-describedby="alert-confirmation-update-description"
      css={css`
        padding: 2rem;
        min-height: 500px;
      `}
    >
      <DialogTitle
        id="alert-confirmation-update-title"
        css={css`
          font-weight: 500;
          font-size: 1.5rem;
        `}
      >
        {`Enter ${placeholder}`}
      </DialogTitle>
      <DialogContent>
        <Form
          onSubmit={e => {
            e.preventDefault()
            onSubmit(val)
          }}
        >
          <FormGroup
            css={css`
              flex-direction: row;
              align-items: center;
              justify-content: center;
            `}
          >
            <InputLabel>{label}</InputLabel>
            <Input
              value={val}
              onChange={({target: {value}}) => setVal(value)}
              type={type}
              placeholder={placeholder}
            />
            <Button
              type="submit"
              variant="contained"
              css={css`
                margin-left: 0.5rem;
              `}
            >
              Update
            </Button>
          </FormGroup>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const Form = styled.form``
