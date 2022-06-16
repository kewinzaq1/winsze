/** @jsxImportSource @emotion/react */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import {css} from '@emotion/react'
import {Button, Dialog, DialogContent, FormGroup, Input} from '@mui/material'
import styled from '@emotion/styled'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {SettingsFormModel} from '../../../Utils/Models/Settings/SettingsForm.model'
import {useSettingsForm} from '../../../Utils/Hooks/Settings/useSettingsForm'

export const SettingsForm = ({
  open,
  onClose,
  placeholder,
  type
}: SettingsFormModel) => {
  const {onSubmit, setVal, val} = useSettingsForm()

  return (
    <Dialog
      open={open ?? false}
      onClose={() => {
        onClose && onClose()
        setVal('')
      }}
      aria-labelledby={`dialog update ${placeholder?.toLowerCase()}`}
    >
      <DialogContent>
        <Form
          onSubmit={e => {
            e.preventDefault()
            onSubmit && onSubmit(val)
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
              value={val}
              onChange={({
                target: {files, value}
              }: React.ChangeEvent<HTMLInputElement>) => {
                if (type === 'file' && files) {
                  setVal(files[0])
                } else setVal(value)
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
