import React from "react";
import { AppBar, Paper, Link, Button, Box } from "@mui/material";
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
import SearchIcon from "@mui/icons-material/Search";

const Navbar = (props) => {
    const navigate = useNavigate();
    const { user, setUser } = props;

    const logoutHandler = () => {
        setUser({ logout: true });
        navigate("/");
    };

    return (
        <Box sx={{ display: "flex", width: "100%" }}>
            <AppBar position="static">
                <Toolbar
                    disableGutters
                    sx={{
                        justifyContent: "space-around",
                        textAlign: "center",
                    }}
                >
                    <Box sx={{ display: "flex", ml: 5, alignItems: "center" }}>
                        <CountertopsIcon
                            sx={{
                                fontSize: "45px",
                                mr: 1,
                            }}
                        />
                        <Typography
                            variant="h6"
                            color="inherit"
                            component="div"
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

                    <Typography
                        variant="h6"
                        color="inherit"
                        component="div"
                        sx={{ ml: 5 }}
                    >
                        <Link
                            component={RouterLink}
                            to="/hacks/view"
                            color="inherit"
                            underline="none"
                        >
                            Explore
                        </Link>
                    </Typography>
                    <Typography
                        variant="h6"
                        color="inherit"
                        component="div"
                        sx={{ ml: 5 }}
                    >
                        <Link
                            component={RouterLink}
                            to="/hacks/favorite/"
                            color="inherit"
                            underline="none"
                        >
                            Favorite Hacks
                        </Link>
                    </Typography>
                    <Typography
                        variant="h6"
                        color="inherit"
                        component="div"
                        sx={{ ml: 5 }}
                    >
                        <Link
                            component={RouterLink}
                            to="/hacks/new"
                            color="inherit"
                            underline="none"
                        >
                            Add A Hack
                        </Link>
                    </Typography>
                    {/* Source: help from James Oltmans for !!user?.firstName*/}
                    {!!user?.firstName ? (
                        <Box
                            sx={{
                                display: "flex",
                                // justifyContent: "flex-end",
                                ml: 5,
                            }}
                        >
                            <Typography
                                sx={{
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
            </AppBar>
        </Box>
    );
};

export default Navbar;
