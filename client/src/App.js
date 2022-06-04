import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegistrationForm from "./components/RegistrationForm";

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
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
