/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  List,
  ListItem,
  Popover,
  TextField,
  Typography,
  InputLabel,
  Input,
  Divider,
} from "@mui/material";
import Moment from "react-moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { myBlue, alertRed, padEl } from "../Layout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { removePost, toggleLike, updatePost } from ".";
import { useAuth } from "../../Auth";
import { ConfirmationDeleteMenu } from "../Layout/ConfirmationDeleteMenu";
import { Comments } from "./Comments/Comments";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Post as ModelPost } from "../../Utils/models";

const Post = ({
  author,
  description,
  date,
  photo: originalPhoto,
  avatar,
  id,
  authorId,
  likes,
  usersWhoLiked,
  comments,
}: ModelPost) => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();
  const [isEdit, setIsEdit] = React.useState(false);
  const [desc, setDesc] = React.useState(description);
  const [editPhotoFile, setEditPhotoFile] = React.useState<File>();
  const [photoPreview, setPhotoPreview] = React.useState(originalPhoto);
  const [isOpenConfirmation, setIsOpenConfirmation] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(
    user && usersWhoLiked?.includes(user?.uid)
  );
  const [isOpenComment, setIsOpenComment] = React.useState(false);
  const isPhotoChanged = originalPhoto !== photoPreview;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
    setIsEdit(false);
    setIsOpenConfirmation(false);
  };

  const open = Boolean(anchorEl);

  const editPost = () => {
    setAnchorEl(undefined);
    setIsEdit(true);
  };

  const onPhotoChange = ({
    target: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files) {
      setPhotoPreview(URL.createObjectURL(files[0]));
      setEditPhotoFile(files[0]);
    }
  };
  const cancelEdit = () => {
    setDesc(description);
    setIsEdit(false);
    setPhotoPreview(originalPhoto);
  };

  const removePhoto = () => {
    setPhotoPreview("");
    setEditPhotoFile(undefined);
  };

  const uploadChanges = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    handleClose();
    const overwrites = {
      description: desc,
      date: `${new Date().toISOString()}`,
    };

    await toast.promise(
      updatePost({
        id,
        editPhotoFile,
        originalPhoto,
        isPhotoChanged,
        overwrites,
      }),
      {
        loading: "Updating",
        success: "Updated",
        error: "Try again",
      }
    );
  };

  const handleDelete = async () => {
    await toast.promise(
      removePost(id, originalPhoto),
      {
        loading: "Removing",
        success: "Removed",
        error: "Try again",
      },
      {
        success: {
          icon: "❌",
        },
      }
    );
  };

  const handleLike = async () => {
    if (user) {
      setIsLiked(!isLiked);
      await toggleLike({ id, isLiked, userId: user.uid });
    }
  };

  const closeConfirmation = () => setIsOpenComment(false);

  return (
    <>
      <Card elevation={0}>
        <Box
          css={css`
            padding: ${padEl};
            gap: 1.25rem;
            display: flex;
            flex-direction: column;
          `}
        >
          <Box
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <Box
              css={css`
                display: flex;
                align-items: center;
                gap: 0.5rem;
              `}
            >
              {avatar ? (
                <Avatar
                  variant="rounded"
                  sizes="large"
                  src={avatar}
                  alt={author}
                  css={css`
                    width: 45px;
                    height: 45px;
                  `}
                />
              ) : (
                <Avatar
                  variant="rounded"
                  sizes="large"
                  alt={author}
                  css={css`
                    background-color: ${myBlue};
                    width: 45px;
                    height: 45px;
                  `}
                >
                  {author?.[0]}
                </Avatar>
              )}
              <Box>
                <Typography variant="subtitle2">
                  <Moment fromNow>{date}</Moment>
                </Typography>
                <Typography
                  variant="h5"
                  css={css`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                  `}
                  component={Link}
                  to={`/users/${authorId}`}
                >
                  {user && authorId === user.uid ? "You" : `@${author}`}
                </Typography>
              </Box>
            </Box>
            {isEdit ? (
              photoPreview ? (
                <IconButton
                  onClick={removePhoto}
                  aria-label="leave changes"
                  component="span"
                  css={css`
                    color: ${alertRed};
                  `}
                >
                  <NoPhotographyIcon />
                </IconButton>
              ) : (
                <IconButton
                  css={css`
                    position: relative;
                  `}
                >
                  <InputLabel htmlFor="add-photo-post">
                    <AddAPhotoIcon
                      css={css`
                        color: ${myBlue};
                      `}
                    />
                  </InputLabel>
                  <Input
                    type="file"
                    id="add-photo-post"
                    name="add-photo-post"
                    css={css`
                      display: none;
                    `}
                    value={editPhotoFile}
                    onChange={onPhotoChange}
                  />
                </IconButton>
              )
            ) : (
              user &&
              user.uid === authorId && (
                <Box>
                  <IconButton
                    aria-label="open post menu"
                    onClick={handleClick}
                    role="button"
                    css={css`
                      cursor: pointer;
                      align-self: flex-start;
                    `}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <Popover
                    css={css`
                      border-radius: 0.5rem;
                    `}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    elevation={2}
                    role="dialog"
                  >
                    <List>
                      <ListItem onClick={editPost}>
                        <Button
                          size={"small"}
                          css={css`
                            color: #2b2b2b;
                          `}
                          startIcon={<EditIcon />}
                          aria-label="Edit post"
                        >
                          Edit
                        </Button>
                      </ListItem>
                      <ListItem>
                        <Button
                          size={"small"}
                          css={css`
                            color: #2b2b2b;
                          `}
                          startIcon={<DeleteIcon />}
                          onClick={() => setIsOpenConfirmation(true)}
                          aria-label="Delete post"
                        >
                          Delete
                        </Button>
                      </ListItem>
                    </List>
                  </Popover>
                </Box>
              )
            )}
          </Box>
          {isEdit ? (
            <Form onSubmit={uploadChanges}>
              <TextField
                css={css``}
                fullWidth
                value={desc}
                onChange={({ target: { value } }) => setDesc(value)}
              />

              <IconButton
                onClick={cancelEdit}
                aria-label="upload changes"
                color="primary"
                role="button"
              >
                <CloseIcon />
              </IconButton>
              <IconButton
                onClick={uploadChanges}
                aria-label="upload changes"
                color="primary"
                role="button"
              >
                <SaveAsIcon />
              </IconButton>
            </Form>
          ) : (
            <Typography variant="h4" component="h1">
              {description}
            </Typography>
          )}
        </Box>
        {photoPreview && (
          <img
            onDoubleClick={handleLike}
            src={photoPreview}
            alt={description}
            css={css`
              width: 100%;
              object-fit: cover;
            `}
          />
        )}
        <Box
          css={css`
            width: 100%;
            padding: 0 0.5rem;
          `}
        >
          <IconButton
            aria-label={isLiked ? "remove like" : "add like"}
            onClick={handleLike}
          >
            {isLiked ? (
              <FavoriteIcon
                css={css`
                  color: ${alertRed};
                  font-family: inherit;
                `}
              />
            ) : (
              <FavoriteBorderIcon />
            )}
            <span aria-label="likes counter">
              {likes && likes > 0 && likes}
            </span>
          </IconButton>
          <IconButton
            aria-label="open comments"
            onClick={() => setIsOpenComment(true)}
            css={css`
              font-family: inherit;
            `}
          >
            <ChatBubbleOutlineIcon />
            <span aria-label="comments counter">{comments?.length}</span>
          </IconButton>
        </Box>
        <Divider />
      </Card>
      <ConfirmationDeleteMenu
        onAgree={handleDelete}
        onClose={handleClose}
        open={isOpenConfirmation}
        deleteItem="post"
      />
      <Comments
        open={isOpenComment}
        onClose={closeConfirmation}
        comments={comments}
        postId={id}
      />
    </>
  );
};

export default Post;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
