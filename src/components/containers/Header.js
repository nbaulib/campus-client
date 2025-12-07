/*==================================================
Header.js

It contains the Header component to be displayed on every page.
The header contains navigation links to every other page.
================================================== */
// Import "material" library for building UI with React components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

import { NavLink } from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#F2F0EF",
  boxShadow: "none",
  padding: theme.spacing(0, 3),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: "2.1rem",
  color: "#111",
}));

const NavItem = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  marginLeft: theme.spacing(3),

  "& .MuiButton-root": {
    textTransform: "none",
    padding: theme.spacing(0.5, 2),
    fontWeight: 400,
    color: "#111",
    borderRadius: 1,
  },

  "&.active-link .MuiButton-root": {
    backgroundColor: "#e0e0e0",
    color: "#111",
  },

}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "#111",
  "&:hover": {
    color: "#000",
    backgroundColor: "rgba(25, 118, 210, 0.04)",
  },
}));

const Header = () => {
  return (
    <StyledAppBar position="static" elevation={0}>
      <Toolbar sx={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
      }}>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Title variant="h3">UniSystem</Title>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <NavItem to="/" exact activeClassName="active-link">
            <Button variant="text">Home</Button>
          </NavItem>

          <NavItem to="/campuses" activeClassName="active-link">
            <Button variant="text">All Campuses</Button>
          </NavItem>

          <NavItem to="/students" activeClassName="active-link">
            <Button variant="text">All Students</Button>
          </NavItem>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <StyledIconButton size="large" aria-label="search">
            <SearchIcon />
          </StyledIconButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
