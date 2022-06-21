import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
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
    Stack,
    Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const HacksList = () => {
    const [hacks, setHacks] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // GET request to find all hacks
        axios
            .get("http://localhost:5000/api/hacks/view")
            .then((res) => {
                console.log(res.data);
                setHacks(res.data.all_hacks);
                setCategories(res.data.all_categories);
            })
            .catch((err) => {
                console.log(
                    "Error with get_all_hacks_with_category_and_user request",
                    err
                );
            });
    }, []);

    useEffect(() => {
        console.log("HACKS", hacks);
    }, [hacks]);

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
            <Grid container spacing={5}>
                {categories.map((categoryData, index) => {
                    return (
                        <Grid item xs={3} key={index}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={categoryData.cat_img}
                                    alt={categoryData.name}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        {categoryData.name}
                                    </Typography>
                                    <List>
                                        {hacks
                                            .filter(
                                                (hack) =>
                                                    hack.category_id ===
                                                    categoryData.id
                                            )
                                            .sort(sortList)
                                            .map((hackData, index) => {
                                                return (
                                                    <div key={index}>
                                                        <Link
                                                            to={`/hacks/view/${hackData.id}`}
                                                            underline="hover"
                                                        >
                                                            {hackData.title}
                                                        </Link>
                                                        <Divider />
                                                    </div>
                                                );
                                            })}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Paper>
    );
};

export default HacksList;
