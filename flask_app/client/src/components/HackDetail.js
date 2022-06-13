import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Paper, Typography, Link, Grid, List } from "@mui/material";
import { Box } from "@mui/system";

const HackDetail = (props) => {
    const navigate = useNavigate();
    const [hack, setHack] = useState({});
    const { hacks, setHacks } = props;
    const { id } = useParams();

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/hacks/" + id) //Remember the slash at the end of the IP address!
            .then((res) => {
                console.log(res.data);
                setHack(res.data);
            })
            .catch((err) => {
                console.log("Error with view_one_hack request", err);
            });
    }, []);

    return (
        <Paper elevation={2} sx={{ p: 5, m: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
                            Title Goes Here: {hack.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Button>
                            <Link href="/" color="inherit" underline="none">
                                Update Hack
                            </Link>
                        </Button>
                        <Button>
                            <Link href="/" color="inherit" underline="none">
                                Delete Hack
                            </Link>
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="h6"
                        color="inherit"
                        component="div"
                        sx={{ ml: 3 }}
                    >
                        <h3>Supplies Needed</h3>
                    </Typography>
                    <Grid container spacing={3} sx={{ display: "flex" }}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Typography
                                    variant="h6"
                                    color="inherit"
                                    component="div"
                                    sx={{ ml: 3 }}
                                >
                                    Supply Name:
                                </Typography>
                                <List></List>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Typography
                                    variant="h6"
                                    color="inherit"
                                    component="div"
                                    sx={{ ml: 3 }}
                                >
                                    Quantity:
                                </Typography>
                                <List></List>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="h6"
                        color="inherit"
                        component="div"
                        sx={{ ml: 3 }}
                    >
                        <h3>Instructions</h3>
                    </Typography>
                </Grid>
            </Box>
        </Paper>
    );
};

export default HackDetail;
