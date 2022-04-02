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

// TODO fix button on small screens

export const AccountForm = ({
  open,
  onClose,
  label,
  placeholder,
  type,
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
            setVal('')
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
              value={type !== 'file' ? val : val.name}
              onChange={({target}) => {
                if (type === 'file') {
                  setVal(target.files)
                } else setVal(target.value)
              }}
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
