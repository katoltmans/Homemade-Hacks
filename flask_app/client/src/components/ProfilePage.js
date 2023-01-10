import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Box, Grid, Paper, Typography, Link } from "@mui/material";

const ProfilePage = (props) => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    // const [errors, setErrors] = useState([]);

    // Styles for profile text
    const stylesText = {
        marginTop: "3px",
    };

    // Styles for profile links
    const stylesLink = {
        color: "#478D95",
        "&:hover": {
            color: "#f5ccb7",
        },
        fontWeight: "bold",
    };

    // UseEffect request will profile autofill data
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
    }, [id]);

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
            {/* Component Header */}
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
                    {user.first_name} {user.last_name}
                </Typography>
            </Box>
            {/* Component text */}
            <Box sx={{ flexGrow: 1, p: 2 }}>
                <Grid container spacing={3}>
                    <Grid item xs={6} sx={stylesText}>
                        <Typography variant="h4" component="h1">
                            Email:
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={stylesText}>
                        <Typography variant="body1" component="p">
                            {user.email}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={3} sx={stylesText}>
                    <Grid item xs={6}>
                        <Typography variant="h4" component="h1">
                            Birth Date:
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={stylesText}>
                        <Typography variant="body1" component="p">
                            {/* {user.birthdate} */}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={3} sx={stylesText}>
                    <Grid item xs={6}>
                        <Typography variant="h4" component="h1">
                            Location:
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={stylesText}>
                        <Typography variant="body1" component="p">
                            {user.location}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={3} sx={stylesText}>
                    <Grid item xs={6}>
                        <Typography variant="h4" component="h1">
                            Username:
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={stylesText}>
                        <Typography variant="body1" component="p">
                            {user.username}
                        </Typography>
                    </Grid>
                </Grid>
                {/* Link to Update component - password changes are available on update page */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        mt: 3,
                    }}
                >
                    <Link
                        component={RouterLink}
                        to={`/profile/update/${id}`}
                        sx={stylesLink}
                    >
                        Update Profile
                    </Link>
                </Box>
            </Box>
        </Paper>
    );
};

export default ProfilePage;
