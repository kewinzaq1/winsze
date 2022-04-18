/** @jsxImportSource @emotion/react */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {css, jsx} from '@emotion/react'
import {useState} from 'react'
import {FormGroup, Input, Button, Dialog, DialogContent} from '@mui/material'
import styled from '@emotion/styled'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React from 'react'
import {UploadResult} from 'firebase/storage'
interface Props {
  open: boolean
  onClose: () => void
  placeholder: string
  type: string
  onSubmit: (
    submittedVal: string | File,
  ) => Promise<UploadResult> | Promise<void>
}

export const SettingsForm = ({
  open,
  onClose,
  placeholder,
  type,
  onSubmit,
}: Props) => {
  const [val, setVal] = useState<File | string>('')

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
              onChange={({target}: React.ChangeEvent<HTMLInputElement>) => {
                if (type === 'file') {
                  setVal(target.files[0])
                } else setVal(target.value)
              }}
              type={type}
              placeholder={placeholder}
              error={typeof val === 'string' && val.length < 6}
            />
            <Button
              type="submit"
              variant="contained"
              css={css`
                margin-left: 0.5rem;
              `}
              disabled={typeof val === 'string' && val.length < 6}
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
