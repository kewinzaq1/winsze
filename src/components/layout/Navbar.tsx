/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { css } from "@emotion/react";
import {
  Button,
  Typography,
  AppBar as Bar,
  Avatar,
  LinearProgress,
} from "@mui/material";
import styled from "@emotion/styled";
import { maxWidth, myBlue } from ".";
import { NavbarMenu } from "./NavbarMenu";
import { Link } from "react-router-dom";
import { useAuth } from "../../Auth";
import { User as FireAuthUser } from "firebase/auth";
import React, { useState } from "react";

interface NavProps {
  status?: string;
}

export const Navbar = () => {
  const {
    isLogin,
    isRegister,
    setLogin,
    setRegister,
    isAuthenticated,
    user,
    logout,
    isLoading,
    status,
  } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(undefined);
  };
  const usernameShortcut = (user: FireAuthUser) => user?.displayName?.[0];
  const emailShortcut = (user: FireAuthUser | undefined) =>
    user?.email?.split("@")[0][0];

  return (
    <AppBar position="sticky">
      <Nav status={status}>
        <Typography
          variant="h1"
          css={css`
            font-weight: 400;
            color: #111;
          `}
        >
          <Link to="/">
            win<span>sze</span>
          </Link>
        </Typography>
        <NavActions>
          {isRegister && (
            <Button variant="contained" onClick={setLogin}>
              Log In
            </Button>
          )}
          {isLogin && (
            <Button variant="outlined" onClick={setRegister}>
              Sign Up
            </Button>
          )}
          {isAuthenticated && (
            <>
              <Avatar
                aria-label="account-menu"
                onClick={handleClick}
                variant={"rounded"}
                alt={user?.email ?? ""}
                src={user?.photoURL ?? ""}
                sx={{ bgcolor: myBlue, cursor: "pointer" }}
              >
                {!user?.displayName && !user?.photoURL && emailShortcut(user)}
                {user?.displayName && !user?.photoURL && usernameShortcut(user)}
              </Avatar>
              <NavbarMenu
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
                user={user}
                logout={logout}
              />
            </>
          )}
        </NavActions>
      </Nav>
      {isLoading && <LinearProgress />}
    </AppBar>
  );
};

const AppBar = styled(Bar)`
  box-shadow: var(--light-box-shadow);
  background: #eceff1;
`;

const baseFlex = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  ${baseFlex};
  width: 100%;
  padding: 1rem;
  height: 100px;
  justify-content: space-between;
  max-width: ${({ status }: NavProps) =>
    status === "authenticated" ? maxWidth : "1400px"};
  margin: 0 auto;

  h1 {
    font-size: 2.25rem;

    span {
      color: #1565c0;
    }
  }

  button {
    white-space: nowrap;
  }
`;

const NavActions = styled.div`
  height: 100%;
  ${baseFlex};
  gap: 0.25rem;
`;
