import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";

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
        <Paper elevation={2}>
            <Typography variant="h3" component="h1">
                Registration Form
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid container item spacing={4}>
                        <Grid item xs={6}>
                            <TextField label="First Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="First Name" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3}>
                        <Grid item xs={12}>
                            <TextField label="First Name" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3}>
                        <Grid item xs={6}>
                            <TextField label="First Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="First Name" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3}>
                        <Grid item xs={6}>
                            <TextField label="First Name" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3}>
                        <Grid item xs={6}>
                            <TextField label="First Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="First Name" variant="outlined" />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default RegistrationForm;
