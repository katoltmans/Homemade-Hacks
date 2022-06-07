import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";

function App() {
    // declare state
    const [hacks, setHacks] = useState([]);

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <Routes>
                    {/* add routes - remember to pass state */}
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/login" element={<LoginForm />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
