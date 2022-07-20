import React, { useState } from "react";
import {
    AppBar,
    Paper,
    Link,
    Button,
    Box,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import {
    Navigate,
    NavLink,
    Router,
    Routes,
    Link as RouterLink,
    useNavigate,
} from "react-router-dom";
import Container from "@mui/material/Container";
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

    const styles = {
        color: "#fff",
        "&:hover": {
            color: "#f5ccb7",
        },
    };

    const menuStyles = {
        color: "#375656",
        "&:hover": {
            color: "#478d95",
        },
    };

    //Style of nav links

    const logoutHandler = () => {
        setUser({ logout: true });
        navigate("/");
    };

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        // <Box sx={{ display: "flex", width: "100%" }}>
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{
                        justifyContent: "space-around",
                        textAlign: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            ml: 5,
                            alignItems: "center",
                        }}
                    >
                        <CountertopsIcon
                            sx={{
                                fontSize: "45px",
                                mr: 1,
                            }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            color="inherit"
                            component="div"
                            sx={{ mr: 3 }}
                        >
                            <Link
                                component={RouterLink}
                                to="/"
                                color="inherit"
                                underline="none"
                            >
                                <h1>Homemade Hacks</h1>
                            </Link>
                        </Typography>
                    </Box>
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
                            {pages.map((page, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography
                                        variant="h6"
                                        color="inherit"
                                        // component="div"
                                        sx={{ ml: 5 }}
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
                        </Menu>
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
                                display: "flex",
                                textALign: "center",
                                // justifyContent: "flex-end",
                                ml: 5,
                            }}
                        >
                            <Typography
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    pt: 1,
                                    fontSize: 30,
                                    fontWeight: "bold",
                                }}
                            >
                                Welcome {user.firstName}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={logoutHandler}
                                sx={{ ml: 3 }}
                            >
                                Logout
                            </Button>
                        </Box>
                    ) : (
                        <Box sx={{ flexDirection: "row-reverse", ml: 5 }}>
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
            </Container>
        </AppBar>
        // </Box>
    );
};

export default Navbar;
