import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Paper, TextField, Typography, Button } from "@mui/material";

const LoginForm = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = props;
    const [errors, setErrors] = useState([]);

    const login = (e) => {
        console.log("submitting");
        e.preventDefault();
        //make axios post request to login user
        console.log("USERNAME: " + username);
        axios
            .post("http://localhost:5000/login", {
                username: username,
                password: password,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                if (!res.data.errors) {
                    //setIsLoggedIn
                    setUser(res.data.user);

                    navigate("/hacks/view");
                } else {
                    setErrors(res.data.errors);
                }
            })
            .catch((err) => {
                console.log("Error with login post request (client)", err);
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
            <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
                Login
            </Typography>
            {errors ? (
                <Typography sx={{ color: "error.main", mb: 5 }}>
                    {errors}
                </Typography>
            ) : null}
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid container item spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="username"
                                label="Username"
                                variant="outlined"
                                onChange={(e) => setUsername(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Button variant="contained" sx={{ mt: 3 }} onClick={login}>
                    Login
                </Button>
            </Box>
        </Paper>
    );
};

export default LoginForm;
