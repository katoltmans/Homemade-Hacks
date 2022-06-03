import React from "react";
import { AppBar, Paper } from "@material-ui/core";
import { NavLink, Router, Routes } from "react-router-dom";

const Navbar = () => {
    return (
        <AppBar position="static">
            <h1>Homemade Hacks</h1>
            {/*<NavLink to="/">Explore</NavLink>
            <NavLink to="/">Add A Hack</NavLink> */}
        </AppBar>
    );
};

export default Navbar;
