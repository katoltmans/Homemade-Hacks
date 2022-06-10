import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {
    Grid,
    Paper,
    Typography,
    Button,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const HacksList = () => {
    const [hacks, sethHacks] = useState([]);

    useEffect(() => {
        // GET request to find all hacks
        axios
            .get("http://localhost:5000/api/hacks/view")
            .then((res) => {
                console.log(res.data);
                sethHacks(res.data);
            })
            .catch((err) => {
                console.log(
                    "Error with get_all_hacks_with_category_and_user request",
                    err
                );
            });
    }, []);

    const sortList = (a, b) => {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    };

    return (
        <Paper elevation={2} sx={{ p: 5, m: 5 }}>
            <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
                Explore Hacks
            </Typography>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Hacks
                        </Typography>
                        <Grid item xs={12} md={6}>
                            <Typography
                                sx={{ mt: 4, mb: 2 }}
                                variant="h6"
                                component="div"
                            >
                                Hacks
                            </Typography>
                            <List dense={dense}>
                                {hacks.sort(sortList).map((hack, index) => {
                                    <ListItem>
                                        <ListItemText>
                                            {/*primary= */}
                                            {/*secondaryAction = ( */}
                                            <Link href="/" underline="hover">
                                                {hacks.title}
                                            </Link>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                            ;{/*); */}
                                        </ListItemText>
                                    </ListItem>;
                                })}
                                {/*secondary={
                                                    secondary
                                                        ? "Secondary text"
                                                        : null
                                                } */}
                            </List>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Paper>
    );
};

export default HacksList;