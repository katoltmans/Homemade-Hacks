import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Box,
    FormControl,
    Grid,
    Paper,
    TextField,
    Typography,
    Button,
} from "@mui/material";

const LoginForm = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = props;
    const [errors, setErrors] = useState([]);

    const login = (e) => {
        console.log("submitting");
        e.preventDefault();
        //make axios post request
        console.log("USERNAME: " + username);
        // Post request to create a new author
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
                p: { xs: 2, sm: 5 },
                mx: { xs: 0, sm: 20 },
                mt: { xs: 0, sm: 3 },
                // backgroundColor: { xs: "#CBDEDF", sm: "#FFF" },
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
            {/* {errors ? (errors.map((errorMessage, index) => {
                <>
                <Typography sx={{ color: "error.main", mb: 5 }}>
                    {errors}
                </Typography>
                <Divider/>
                </>
            }) : null} */}
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
