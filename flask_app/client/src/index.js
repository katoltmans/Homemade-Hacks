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
import WelcomePage from "./components/WelcomePage";

const App = () => {
    // declare state
    const [hacks, setHacks] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(JSON.parse(window.localStorage.getItem("user")));
    }, []);

    useEffect(() => {
        window.localStorage.setItem("user", JSON.stringify(user));
    }, [user]);
    // Source: https://blog.bitsrc.io/5-methods-to-persisting-state-between-page-reloads-in-react-8fc9abd3fa2f

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar user={user} />
                <Routes>
                    {/* add routes - remember to pass state */}
                    <Route path="/" element={<WelcomePage />} />
                    <Route
                        path="/register"
                        element={
                            <RegistrationForm user={user} setUser={setUser} />
                        }
                    />
                    <Route
                        path="/login"
                        element={<LoginForm user={user} setUser={setUser} />}
                    />
                    {/*<Route path="/hacks/new" element={<LoginForm />} /> */}
                    <Route path="/hacks/view" element={<HacksList />} />
                    <Route
                        path="/hacks/new"
                        element={<AddHack user={user} setUser={setUser} />}
                    />
                    <Route path="/hacks/view/:id" element={<HackDetail />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
