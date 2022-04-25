/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { css } from "@emotion/react";
import {
  Box,
  Button,
  Dialog,
  Divider,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { addComment } from "..";
import { useAuth } from "../../../Auth";
import { Comment } from "./Comment";

interface CommentsModel {
  open: boolean;
  onClose?: () => void;
  comments?: string[];
  postId: string;
}

export const Comments = ({
  open,
  onClose,
  comments,
  postId,
}: CommentsModel) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContent("");
    await toast.promise(addComment({ postId, user, content }), {
      loading: "Adding",
      success: "Added",
      error: "Try again",
    });
  };
  const commentOnChange = ({
    target: { value: content },
  }: React.ChangeEvent<HTMLInputElement>) => setContent(content);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      css={css`
        width: 100%;
      `}
    >
      <Box>
        <Typography
          variant="h5"
          component="h1"
          css={css`
            padding: 1rem;
          `}
        >
          {comments && comments?.length === 1 && `${comments.length} Comment`}
          {comments && comments?.length > 1 && `${comments.length} Comments`}
          {!comments?.length && `Write first comment`}
        </Typography>
        <form
          css={css`
            width: 100%;
          `}
          onSubmit={handleSubmit}
        >
          <FormGroup
            css={css`
              flex-direction: row;
              justify-content: space-between;
              padding: 1rem;
              gap: 0.25rem;
              width: 100%;
              flex-wrap: nowrap;
            `}
          >
            <TextField
              className={"123"}
              placeholder="Write a comment"
              value={content}
              onChange={commentOnChange}
              css={css`
                width: 80%;
              `}
            />
            <Button
              variant="contained"
              type="submit"
              css={css`
                width: 20%;
              `}
              disabled={!content?.length}
            >
              Add
            </Button>
          </FormGroup>
        </form>
      </Box>
      <Divider />
      {Boolean(comments?.length) && (
        <Stack
          css={css`
            max-width: 100%;
          `}
          divider={<Divider />}
        >
          {comments?.sort().map((comment) => (
            <Comment key={comment} comment={comment} postId={postId} />
          ))}
        </Stack>
      )}
    </Dialog>
  );
};
