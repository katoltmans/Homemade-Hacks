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
    List,
    ListItem,
} from "@mui/material";

const UpdateProfile = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const [errors, setErrors] = useState([]);

    // UseEffect request to autofill profile data
    useEffect(() => {
        console.log(id);
        axios
            .get("/api/profile/view/" + id)
            .then((res) => {
                console.log("USER:", res.data);
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
    const onSubmitHandler = (e) => {
        console.log("submitting profile update");
        e.preventDefault();
        //make axios post request
        console.log(user);

        // Post request to update
        axios
            .post(`/profile/update/${id}`, user)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                if (!res.data?.errors) {
                    //set user if successfully registered
                    setUser(user);
                    navigate("/profile/view/" + id);
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

    if (!user) {
        return null;
    }

    return (
        <Paper
            elevation={2}
            sx={{
                mx: { xs: 0, sm: 10, md: 20, lg: 30 },
                mt: { xs: 0, sm: 2 },
                height: { xs: "100%", md: "auto" },
            }}
        >
            <Box
                sx={{
                    height: { xs: 150, sm: 250 },
                    display: "block",
                    maxWidth: 1920,
                    overflow: "hidden",
                    width: "100%",
                    backgroundImage: "url('/static/img/updateProfile.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Photo by Jess Bailey Designs: https://www.pexels.com/photo/gold-pen-1119794/ */}
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        mb: 2,
                        color: "#FFF",
                        textShadow: "2px 2px 6px #000000",
                        p: { xs: 1, sm: 2 },
                    }}
                >
                    Update Profile
                </Typography>
            </Box>
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
            <Box sx={{ flexGrow: 1, p: 2 }}>
                <Grid container spacing={3}>
                    <Grid container item spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="first_name"
                                label="First Name"
                                defaultValue={user.first_name}
                                variant="outlined"
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="last_name"
                                label="Last Name"
                                defaultValue={user.last_name}
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
                                defaultValue={user.email}
                                variant="outlined"
                                onChange={onChangeHandler}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3}>
                        {/* <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="birthdate"
                                label="Birth Date (YYYY/MM/DD)"
                                defaultValue={user.birthdate.toString()}
                                variant="outlined"
                                onChange={onChangeHandler}
                            />
                        </Grid> */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="location"
                                label="Location"
                                defaultValue={user.location}
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

export default UpdateProfile;
