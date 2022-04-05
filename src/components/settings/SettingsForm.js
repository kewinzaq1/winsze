/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import {css, jsx} from '@emotion/react'
import {useState} from 'react'
import {FormGroup, Input, Button, Dialog, DialogContent} from '@mui/material'
import styled from '@emotion/styled'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export const SettingsForm = ({
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
      aria-labelledby={`dialog update ${placeholder.toLowerCase()}`}
    >
      <DialogContent>
        <Form
          onSubmit={e => {
            e.preventDefault()
            onSubmit(val)
            setVal('')
          }}
          css={css`
            flex-direction: row;
          `}
        >
          <FormGroup
            css={css`
              flex-direction: row;
              align-items: center;
              justify-content: center;
              flex-wrap: nowrap;
            `}
          >
            <Input
              value={type !== 'file' ? val : val[0]}
              onChange={({target}) => {
                if (type === 'file') {
                  setVal(target.files[0])
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
              <ExpandMoreIcon
                css={css`
                  fill: white;
                `}
              />
            </Button>
          </FormGroup>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const Form = styled.form``
