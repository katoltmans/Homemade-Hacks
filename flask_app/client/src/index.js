import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import HacksList from "./components/HacksList";
import AddHack from "./components/AddHack";
import HackDetail from "./components/HackDetail";
import UpdateHack from "./components/UpdateHack";
import WelcomePage from "./components/WelcomePage";
import FavoriteHackList from "./components/FavoriteHackList";
import CategoryPage from "./components/CategoryPage";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";

const App = () => {
    const [hacks, setHacks] = useState([]);
    const [user, setUser] = useState({});

    // Sets user on login
    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem("user")));
    }, []);

    useEffect(() => {
        let userStr = JSON.stringify(user);
        if (!!user?.username) {
            console.log("Changing user: ", user);
            window.localStorage.setItem("user", userStr);
        } else if (!!user?.logout) {
            console.log("logout user: ", user);
            window.localStorage.setItem("user", "{}");
        }
    }, [user]);
    // Source: https://blog.bitsrc.io/5-methods-to-persisting-state-between-page-reloads-in-react-8fc9abd3fa2f
    // Source: https://betterprogramming.pub/javascript-bang-bang-i-shot-you-down-use-of-double-bangs-in-javascript-7c9d94446054

    const theme = createTheme({
        palette: {
            background: {
                default: "#eaeeed",
                // "#CBDEDF"
            },
            primary: {
                main: "#478d95",
            },
            secondary: {
                main: "#b0bec5",
            },
            text: {
                primary: "#808e95",
            },
            text: {
                secondary: "#478d95",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <BrowserRouter>
                    <div className="App">
                        <Navbar user={user} setUser={setUser} />
                        <Routes>
                            <Route path="/" element={<WelcomePage />} />
                            <Route
                                path="/register"
                                element={
                                    <RegistrationForm
                                        user={user}
                                        setUser={setUser}
                                    />
                                }
                            />
                            <Route
                                path="/login"
                                element={
                                    <LoginForm user={user} setUser={setUser} />
                                }
                            />
                            <Route
                                path="/hacks/view"
                                element={
                                    <HacksList user={user} setUser={setUser} />
                                }
                            />
                            <Route
                                path="/hacks/favorite/"
                                element={
                                    <FavoriteHackList
                                        user={user}
                                        setUser={setUser}
                                    />
                                }
                            />

                            <Route
                                path="/hacks/new"
                                element={
                                    <AddHack user={user} setUser={setUser} />
                                }
                            />

                            <Route
                                path="/hacks/view/:id"
                                element={
                                    <HackDetail
                                        hacks={hacks}
                                        setHacks={setHacks}
                                        user={user}
                                        setUser={setUser}
                                    />
                                }
                            />
                            <Route
                                path="/hacks/update/:id"
                                element={
                                    <UpdateHack user={user} setUser={setUser} />
                                }
                            />
                            <Route
                                path="/hacks/category/:category_id"
                                element={
                                    <CategoryPage
                                        hacks={hacks}
                                        setHacks={setHacks}
                                    />
                                }
                            />
                        </Routes>
                    </div>
                </BrowserRouter>
            </CssBaseline>
        </ThemeProvider>
    );
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
