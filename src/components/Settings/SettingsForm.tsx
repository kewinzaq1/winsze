/** @jsxImportSource @emotion/react */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css } from "@emotion/react";
import { FormGroup, Input, Button, Dialog, DialogContent } from "@mui/material";
import styled from "@emotion/styled";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { useSettings } from "./index";

interface Props {
  open?: boolean;
  onClose?: () => void;
  placeholder?: string;
  type?: string;
}

export const SettingsForm = ({ open, onClose, placeholder, type }: Props) => {
  const { settings, updatePhoto, updateNickname, updatePassword, updateEmail } =
    useSettings();

  const [val, setVal] = React.useState<File | string>("");

  const onSubmit = (submittedVal: string | File) => {
    if (typeof submittedVal === "object") {
      if (settings === "picture" && updatePhoto) {
        return updatePhoto(submittedVal);
      }
    } else {
      if (settings === "nickname" && updateNickname) {
        return updateNickname(submittedVal);
      }
      if (settings === "password" && updatePassword) {
        return updatePassword(submittedVal);
      }
      if (settings === "email" && updateEmail) {
        return updateEmail(submittedVal);
      }
    }
  };

  return (
    <Dialog
      open={open ?? false}
      onClose={() => {
        onClose && onClose();
        setVal("");
      }}
      aria-labelledby={`dialog update ${placeholder?.toLowerCase()}`}
    >
      <DialogContent>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit && onSubmit(val);
            setVal("");
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
                target: { files, value },
              }: React.ChangeEvent<HTMLInputElement>) => {
                if (type === "file" && files) {
                  setVal(files[0]);
                } else setVal(value);
              }}
              type={type}
              placeholder={placeholder}
              error={typeof val === "string" && val.length < 6}
            />
            <Button
              type="submit"
              variant="contained"
              css={css`
                margin-left: 0.5rem;
              `}
              disabled={typeof val === "string" && val.length < 6}
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
  );
};

const Form = styled.form``;
