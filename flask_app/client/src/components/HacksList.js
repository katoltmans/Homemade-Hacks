import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import {
    Grid,
    Paper,
    Typography,
    Card,
    CardMedia,
    CardContent,
    List,
    Divider,
    Link,
} from "@mui/material";
import "../components/HackListStyles.css";

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
        <Paper elevation={2} sx={{ p: 5, m: 3 }}>
            <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
                Explore Hacks
            </Typography>
            <Grid container spacing={5}>
                {categories.map((categoryData, index) => {
                    return (
                        <Grid item xs={12} sm={4} lg={3} key={index}>
                            <Card
                                sx={{
                                    maxWidth: 345,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <Link
                                    component={RouterLink}
                                    to={`/hacks/category/${categoryData.id}`}
                                    underline="none"
                                >
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={categoryData.cat_img}
                                        alt={categoryData.name}
                                        className="catImgs"
                                    />
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h5"
                                        color="#478D95"
                                        className="catTitles"
                                        sx={{ mx: 2, mt: 2 }}
                                    >
                                        {categoryData.name}
                                    </Typography>
                                </Link>
                                <CardContent>
                                    <List
                                        sx={{
                                            overflowY: "auto",
                                            scrollbarWidth: "none",
                                            height: "150px",
                                        }}
                                    >
                                        {!!hacks
                                            ? hacks
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
                                                                  component={
                                                                      RouterLink
                                                                  }
                                                                  to={`/hacks/view/${hackData.id}`}
                                                                  underline="hover"
                                                                  className="hackItems"
                                                              >
                                                                  <span
                                                                      data-content={
                                                                          hackData.title
                                                                      }
                                                                      aria-hidden="true"
                                                                  ></span>
                                                                  {
                                                                      hackData.title
                                                                  }
                                                              </Link>
                                                              <Divider />
                                                          </div>
                                                      );
                                                  })
                                            : null}
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
