/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import {
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";

function AccountSetting({ closeModal: close, isModalOpen: open, user }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "1rem",
  };
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-settings-title"
      aria-describedby="modal-settings-description"
    >
      <Box sx={style}>
        <Typography id="modal-settings-title" variant="h6" component="h2">
          Hi {user?.displayName} change your settings
        </Typography>
        <Typography id="modal-modal-description" variant="subtitle1">
          Personalize settings for your preferences
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BadgeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="nickname"
              secondary={`@${user?.displayName}`}
            />
            <Divider />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>{/*<WorkIcon />*/}</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Work" secondary="Jan 7, 2014" />
            <Divider />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>{/*<BeachAccessIcon />*/}</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Vacation" secondary="July 20, 2014" />
            <Divider />{" "}
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>{/*<BeachAccessIcon />*/}</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Vacation" secondary="July 20, 2014" />
            <Divider />
          </ListItem>
        </List>
      </Box>
    </Modal>
  );
}

export default AccountSetting;
