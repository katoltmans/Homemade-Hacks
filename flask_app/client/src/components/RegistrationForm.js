import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Grid,
    Paper,
    TextField,
    Typography,
    Button,
    ListItem,
    List,
} from "@mui/material";

const RegistrationForm = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        birthdate: "",
        location: "",
        username: "",
        password: "",
        confirm_password: "",
    });
    const [errors, setErrors] = useState([]);

    const onChangeHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitHandler = (e) => {
        console.log("submitting registration");
        e.preventDefault();
        //make axios post request
        console.log(user);
        // Post request to create a new author
        axios
            .post("/register", user)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                if (!res.data?.errors) {
                    //set user if successfully registered
                    setUser(user);
                    navigate("/hacks/view");
                } else {
                    // Add errors to be d
                    setErrors(res.data.errors);
                }
            })
            .catch((err) => {
                console.log(
                    "Error with post registration request (client)",
                    err
                );
                setErrors(err.response.data?.error?.errors);
                console.log("ERROR:", errors);
            });
    };

    return (
        <Paper
            elevation={2}
            sx={{
                mx: { xs: 0, sm: 10, md: 20, lg: 30 },
                mt: { xs: 0, sm: 2 },
                height: { xs: "100%", md: "auto" },
                p: 2,
            }}
        >
            <Typography
                variant="h3"
                component="h1"
                sx={{ mb: { xs: 1, sm: 3 } }}
            >
                Registration Form
            </Typography>
            {errors ? (
                <List sx={{ mb: 5 }}>
                    {errors.map((error, index) => {
                        return (
                            <ListItem key={index} sx={{ color: "error.main" }}>
                                {error}
                            </ListItem>
                        );
                    })}
                </List>
            ) : null}
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid container item spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="first_name"
                                label="First Name"
                                variant="outlined"
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="last_name"
                                label="Last Name"
                                variant="outlined"
                                onChange={onChangeHandler}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="email"
                                label="Email"
                                variant="outlined"
                                onChange={onChangeHandler}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="birthdate"
                                label="Birth Date (YYYY/MM/DD)"
                                variant="outlined"
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="location"
                                label="Location"
                                variant="outlined"
                                onChange={onChangeHandler}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="username"
                                label="Username"
                                variant="outlined"
                                onChange={onChangeHandler}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="password"
                                type="password"
                                label="Password"
                                variant="outlined"
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="confirm_password"
                                type="password"
                                label="Confirm Password"
                                variant="outlined"
                                onChange={onChangeHandler}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={onSubmitHandler}
                >
                    Submit
                </Button>
            </Box>
        </Paper>
    );
};

export default RegistrationForm;
