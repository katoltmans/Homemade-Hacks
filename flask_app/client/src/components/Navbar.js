import React from "react";
import { AppBar, Paper, Link, Button, Box } from "@mui/material";
import { NavLink, Router, Routes } from "react-router-dom";
import Container from "@mui/material/Container";
//import CountertopsIcon from "@mui/icons-material/Countertops";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
//import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/*<CountertopsIcon
                    sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
    />*/}
                    <Typography variant="h6" color="inherit" component="div">
                        <h1>Homemade Hacks</h1>
                    </Typography>
                    <Typography
                        variant="h6"
                        color="inherit"
                        component="div"
                        sx={{ ml: 5 }}
                    >
                        <Link href="/" color="inherit" underline="none">
                            Explore
                        </Link>
                    </Typography>
                    <Typography
                        variant="h6"
                        color="inherit"
                        component="div"
                        sx={{ ml: 5 }}
                    >
                        <Link href="/" color="inherit" underline="none">
                            Favorite Hacks
                        </Link>
                    </Typography>
                    <Typography
                        variant="h6"
                        color="inherit"
                        component="div"
                        sx={{ ml: 5 }}
                    >
                        <Link href="/" color="inherit" underline="none">
                            Add A Hack
                        </Link>
                    </Typography>
                    <Box sx={{ flexDirection: "row-reverse" }}>
                        <Button variant="contained">
                            <Link
                                href="/login"
                                color="inherit"
                                underline="none"
                            >
                                Login
                            </Link>
                        </Button>
                        <Button variant="contained">
                            <Link
                                href="/register"
                                color="inherit"
                                underline="none"
                            >
                                Register
                            </Link>
                        </Button>
                        <Button variant="contained">
                            <Link href="/" color="inherit" underline="none">
                                Logout
                            </Link>
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
