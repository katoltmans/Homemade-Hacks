import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
    Button,
    Paper,
    Typography,
    Link,
    Grid,
    List,
    ListItem,
} from "@mui/material";
import { Box } from "@mui/system";

const HackDetail = (props) => {
    const navigate = useNavigate();
    const [hack, setHack] = useState({});
    const { hacks, setHacks } = props;
    const { user, setUser } = props;
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        axios
            .get("http://localhost:5000/api/hacks/view/" + id) //Remember the slash at the end of the IP address!
            .then((res) => {
                console.log(res.data);
                setHack(res.data);
            })
            .catch((err) => {
                console.log("Error with view_one_hack request", err);
            });
    }, []);

    const handleDelete = (hackId) => {
        axios
            .delete(`http://localhost:5000/api/hacks/delete/${hackId}`)
            .then((res) => {
                console.log(res);
                setHacks(hacks.filter((hack) => hack.id !== hackId));
                navigate("/hacks/view");
            })
            .catch((err) => {
                console.log("Error with delete request (client)", err);
            });
    };

    const addFavorite = () => {
        axios
            .post("http://localhost:5000/api/hacks/favorite", {
                user_id: user.id,
                hack_id: hack.id,
            }) //Remember the slash at the end of the IP address!
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log("Error with view_one_hack request", err);
            });
    };

    return (
        <Paper elevation={2} sx={{ p: 5, m: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
                            {hack.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            variant="contained"
                            onClick={() => addFavorite(hack.id)}
                        >
                            Add To Favorites
                        </Button>
                    </Grid>
                    {user.id == hack.user_id ? (
                        <Grid item xs={3}>
                            <Button variant="contained">
                                <Link
                                    href={`/hacks/update/${hack.id}`}
                                    color="inherit"
                                    underline="none"
                                >
                                    Update Hack
                                </Link>
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => handleDelete(hack.id)}
                            >
                                Delete Hack
                            </Button>
                        </Grid>
                    ) : null}
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
                        <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                color="inherit"
                                component="div"
                                sx={{ ml: 3 }}
                            >
                                Supply Name (Quantity):
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <ul>
                                {hack?.supplies
                                    ?.split(";")
                                    ?.map((supply, index) => {
                                        let [item, quantity] =
                                            supply.split(",");
                                        return (
                                            <li key={index}>
                                                {item} ({quantity})
                                            </li>
                                        );
                                    })}
                            </ul>
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
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ul>
                            {hack?.instructions
                                ?.split(",")
                                ?.map((step, index) => {
                                    return <li key={index}>{step}</li>;
                                })}
                        </ul>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default HackDetail;
