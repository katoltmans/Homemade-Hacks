import React, { useState } from "react";
import "./NavbarStyles.css";
import {
    AppBar,
    Link,
    Button,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Stack,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CountertopsIcon from "@mui/icons-material/Countertops";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

const pages = [
    { title: "Explore", link: "/hacks/view" },
    { title: "Favorite Hacks", link: "/hacks/favorite" },
    { title: "Add A Hack", link: "/hacks/new" },
];

const Navbar = (props) => {
    const navigate = useNavigate();
    const { user, setUser } = props;
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElProfile, setAnchorElProfile] = useState(null);

    //Style of nav links
    const styles = {
        color: "#fff",
        "&:hover": {
            color: "#f5ccb7",
        },
    };

    //Style of menu items
    const menuStyles = {
        color: "#375656",
        "&:hover": {
            color: "#478d95",
        },
    };

    const logoutHandler = () => {
        setUser({ logout: true });
        navigate("/");
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenProfileMenu = (event) => {
        setAnchorElProfile(event.currentTarget);
        console.log("TARGET", event.currentTarget);
    };

    const handleCloseProfileMenu = () => {
        setAnchorElProfile(null);
    };

    return (
        <AppBar position="static">
            {/* Mobile layout */}
            <Box sx={{ mx: 2 }}>
                <Toolbar
                    disableGutters
                    sx={{
                        justifyContent: "space-evenly",
                        textAlign: "center",
                        p: 0,
                    }}
                >
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                        }}
                    >
                        <CountertopsIcon
                            sx={{
                                fontSize: "40px",
                                mr: 1,
                            }}
                        />
                        <Typography
                            variant="h4"
                            noWrap
                            color="inherit"
                            component="h1"
                            sx={{ mr: 3, fontWeight: "bold" }}
                        >
                            <Link
                                component={RouterLink}
                                to="/"
                                color="inherit"
                                underline="none"
                            >
                                Homemade Hacks
                            </Link>
                        </Typography>
                    </Box>
                    {/* Drop down menu for navigation options */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {/* Display links to other components */}
                            {pages.map((page, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography
                                        variant="h6"
                                        color="inherit"
                                        sx={{ ml: 2 }}
                                    >
                                        <Link
                                            component={RouterLink}
                                            to={page.link}
                                            underline="none"
                                            sx={menuStyles}
                                        >
                                            {page.title}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                            {/* Profile link appears in same menu with other navigation options on mobile only*/}
                            <MenuItem
                                key="profile"
                                onClick={handleCloseNavMenu}
                            >
                                <Typography
                                    variant="h6"
                                    color="inherit"
                                    sx={{ ml: 2 }}
                                >
                                    <Link
                                        component={RouterLink}
                                        to={`/profile/view/${user.id}`}
                                        underline="none"
                                        sx={menuStyles}
                                    >
                                        Profile
                                    </Link>
                                </Typography>
                            </MenuItem>
                            {/* Display logout button only when a user is signed in */}
                            {!!user?.firstName ? (
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Button
                                        variant="contained"
                                        onClick={logoutHandler}
                                        sx={{ ml: 2 }}
                                    >
                                        Logout
                                    </Button>
                                </MenuItem>
                            ) : (
                                <MenuItem onClick={handleCloseNavMenu}>
                                    {/* Display Login and Register buttons when a user is not signed in */}
                                    <Button variant="contained" sx={{ ml: 2 }}>
                                        <Link
                                            component={RouterLink}
                                            to="/login"
                                            underline="none"
                                            sx={{ color: "#FFF" }}
                                        >
                                            Login
                                        </Link>
                                    </Button>
                                </MenuItem>
                            )}
                            {!!user?.firstName ? null : (
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Button variant="contained" sx={{ ml: 2 }}>
                                        <Link
                                            component={RouterLink}
                                            to="/register"
                                            underline="none"
                                            sx={{ color: "#FFF" }}
                                        >
                                            Register
                                        </Link>
                                    </Button>
                                </MenuItem>
                            )}
                        </Menu>
                        {/* Website layout */}
                        <Box
                            sx={{
                                ml: 5,
                                alignItems: "center",
                            }}
                        >
                            <CountertopsIcon
                                sx={{
                                    fontSize: "30px",
                                    mr: 1,
                                }}
                            />
                            <Typography
                                variant="body1"
                                noWrap
                                color="inherit"
                                component="h1"
                                sx={{ mr: 3 }}
                            >
                                <Link
                                    component={RouterLink}
                                    to="/"
                                    color="inherit"
                                    underline="none"
                                >
                                    Homemade Hacks
                                </Link>
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: {
                                xs: "none",
                                md: "flex",
                                justifyContent: "space-around",
                            },
                        }}
                    >
                        {/* Display links to other components */}
                        {pages.map((page, index) => {
                            return (
                                <Typography
                                    variant="h6"
                                    color="#fff"
                                    key={index}
                                    sx={{ mx: 2 }}
                                >
                                    <Link
                                        to={page.link}
                                        component={RouterLink}
                                        color="inherit"
                                        underline="none"
                                        sx={styles}
                                    >
                                        {page.title}
                                    </Link>
                                </Typography>
                            );
                        })}
                    </Box>

                    {!!user?.firstName ? (
                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                textAlign: "center",
                                ml: 5,
                            }}
                        >
                            {/* Display menu when a user is signed in */}
                            <Button
                                id="initials"
                                onClick={handleOpenProfileMenu}
                                aria-controls="menu-profile"
                                aria-haspopup="true"
                            >
                                {user.firstName.slice(0, 1)}
                                {user.lastName.slice(0, 1)}
                            </Button>
                            <Menu
                                id="menu-profile"
                                anchorEl={anchorElProfile}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={!!anchorElProfile}
                                onClose={handleCloseProfileMenu}
                                MenuListProps={{
                                    "aria-labelledby": "initials",
                                }}
                            >
                                <Stack sx={{ p: 2 }}>
                                    <MenuItem onClick={handleCloseProfileMenu}>
                                        <Link
                                            component={RouterLink}
                                            to={`/profile/view/${user.id}`}
                                            // profile/view/${id}
                                            color="inherit"
                                            underline="none"
                                            sx={menuStyles}
                                        >
                                            Profile
                                        </Link>
                                    </MenuItem>
                                    <Button
                                        variant="contained"
                                        onClick={logoutHandler}
                                        sx={{ mt: 1 }}
                                    >
                                        Logout
                                    </Button>
                                </Stack>
                            </Menu>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                flexDirection: "row-reverse",
                                ml: 5,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            {/* Display buttons when a user is not signed in */}
                            <Button variant="contained">
                                <Link
                                    component={RouterLink}
                                    to="/login"
                                    color="inherit"
                                    underline="none"
                                >
                                    Login
                                </Link>
                            </Button>
                            <Button variant="contained">
                                <Link
                                    component={RouterLink}
                                    to="/register"
                                    color="inherit"
                                    underline="none"
                                >
                                    Register
                                </Link>
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </Box>
        </AppBar>
    );
};

export default Navbar;
