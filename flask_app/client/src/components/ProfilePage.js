import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Grid,
    Paper,
    TextField,
    Typography,
    Button,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    List,
    ListItem,
    Stack,
} from "@mui/material";

const ProfilePage = (props) => {
    const navigate = useNavigate();
    const { user, setUser } = useState(null);
    const { id } = useParams();
    const [errors, setErrors] = useState([]);

    // UseEffect request will profile autofill data
    useEffect(() => {
        console.log(id);
        axios
            .get("http://localhost:5000/api/profile/view/" + id)
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log("Error with display_user request", err);
            });
    }, []);

    // Handler to update and display user data when changed on profile page
    const onChangeHandler = (e) => {
        console.log(e.target.name);
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    // Post request to update user data when changed on the profile page
};
