import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Paper, Typography, Link, Grid, Stack } from "@mui/material";
import { Box } from "@mui/system";

const HackDetail = (props) => {
    const navigate = useNavigate();
    const [hack, setHack] = useState({});
    const { hacks, setHacks } = props;
    const [favorite, setFavorite] = useState(false);
    const [categoryImg, setCategoryImg] = useState();
    const { user, setUser } = props;
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        axios
            .all([
                axios.get("/api/hacks/view/" + id),
            ])
            .then(
                axios.spread((...responses) => {
                    console.log(responses);
                    console.log(responses[0].data);
                    setHack(responses[0].data);
                    setCategoryImg(responses[0].data.cat_img);
                })
            )
            .catch((err) => {
                console.log("Error with view_one_hack request", err);
            });
    }, [id]);

    useEffect(() => {
        if(!!id && !!user?.id) {
            axios
            .all([
                axios.get(
                    `/api/user/${user.id}/favorites/${id}`
                ),
            ])
            .then(
                axios.spread((...responses) => {
                    console.log(responses[0].data);
                    setFavorite(responses[0].data.favorite_status > 0);
                })
            )
            .catch((err) => {
                console.log("Error with view_favorite_hacks request", err);
            });
        }
    }, [id, user]);

    const handleDelete = (hackId) => {
        axios
            .delete(`/api/hacks/delete/${hackId}`)
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
            .post("/api/hacks/favorite", {
                user_id: user.id,
                hack_id: hack.id,
            }) 
            .then((res) => {
                console.log(res.data);
                setFavorite(true);
            })
            .catch((err) => {
                console.log("Error with favorite request", err);
            });
    };

    const unfavorite = () => {
        axios
            .post("/api/hacks/unfavorite", {
                user_id: user.id,
                hack_id: hack.id,
            }) 
            .then((res) => {
                console.log(res.data);
                setFavorite(false);
            })
            .catch((err) => {
                console.log("Error with unfavorite request", err);
            });
    };

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
                    height: { xs: 100, sm: 200 },
                    display: "block",
                    maxWidth: 1920,
                    overflow: "hidden",
                    width: "100%",
                    backgroundImage: `url(${categoryImg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Photo by Kaboompics .com: https://www.pexels.com/photo/flour-in-a-jar-5765/ */}
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
                    {hack.title}
                </Typography>
            </Box>
            <Stack spacing={2} sx={{ p: 2 }}>
                {!!user?.username ? (
                    <Grid
                        container
                        direction="row"
                        rowSpacing={{ xs: 2 }}
                        columnSpacing={{ xs: 1 }}
                        sx={{ display: "flex" }}
                    >
                        {/* Update and Delete buttons appear only for Hack creator */}
                        {user.id === hack.user_id ? (
                            <Grid
                                item
                                xs={12}
                                sm={9}
                                sx={{
                                    display: "flex",
                                    justifyContent: {
                                        xs: "center",
                                        sm: "flex-start",
                                    },
                                }}
                            >
                                <Button variant="contained">
                                    <Link
                                        href={`/hacks/update/${hack.id}`}
                                        color="inherit"
                                        underline="none"
                                        sx={{ width: "140px" }}
                                    >
                                        Update Hack
                                    </Link>
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{ width: "170px" }}
                                    onClick={() => handleDelete(hack.id)}
                                >
                                    Delete Hack
                                </Button>
                            </Grid>
                        ) : null}
                        <Grid
                            item
                            xs={12}
                            sm={3}
                            sx={{ alignSelf: "flex-end" }}
                        >
                            {!favorite ? (
                                <Button
                                    variant="contained"
                                    sx={{ width: "170px" }}
                                    onClick={() => addFavorite(hack.id)}
                                >
                                    Add To Favorites
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    sx={{ width: "170px" }}
                                    onClick={() => unfavorite(hack.id)}
                                >
                                    Unfavorite
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                ) : null}
                <Stack>
                    <Grid
                        container
                        item
                        spacing={0}
                        sx={{ flexDirection: "column", mt: 3 }}
                    >
                        <Typography
                            variant="h6"
                            color="inherit"
                            component="h3"
                            sx={{ my: 0, fontWeight: "bold" }}
                        >
                            Supplies Needed
                        </Typography>
                        <Typography
                            variant="body2"
                            color="#478D95"
                            component="p"
                            sx={{ mt: 0 }}
                        >
                            Supply Name (Quantity)
                        </Typography>
                    </Grid>
                </Stack>

                <ul>
                    {!!hack?.supplies
                        ? JSON.parse(hack.supplies)?.map((supply, index) => {
                              return (
                                  <li key={index}>
                                      {supply.supply_name} ({supply.quantity})
                                  </li>
                              );
                          })
                        : null}
                </ul>
                <Typography
                    variant="h5"
                    color="inherit"
                    component="h3"
                    sx={{ fontWeight: "bold" }}
                >
                    Instructions
                </Typography>
                <ul>
                    {!!hack?.instructions
                        ? JSON.parse(hack.instructions)?.map((step, index) => {
                              return <li key={index}>{step}</li>;
                          })
                        : null}
                </ul>
            </Stack>
        </Paper>
    );
};

export default HackDetail;
