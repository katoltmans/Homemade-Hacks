import { useState } from "react";
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

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        birthdate: "",
        location: "",
        username: "",
        password: "",
    });

    const onChangeHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        //make axios post request
    };

    return (
        <Paper elevation={2} sx={{ p: 5, m: 5 }}>
            <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
                Registration Form
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid container item spacing={1}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Birthdate"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Location"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Username"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type="password"
                                label="Password"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type="password"
                                label="Confirm Password"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Button variant="contained" sx={{ mt: 3 }}>
                    Submit
                </Button>
            </Box>
        </Paper>
    );
};

export default RegistrationForm;
