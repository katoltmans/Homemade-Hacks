import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link as RouterLink } from "react-router-dom";
import { List, Paper, Stack, Typography, Link, Divider } from "@mui/material";
import "../components/HackListStyles.css";

const CategoryPage = (props) => {
    // const navigate = useNavigate();
    const [hacks, setHacks] = useState([]);
    const [catName, setCatName] = useState();
    const [catImg, setCatImg] = useState();
    const { category_id } = useParams();

    // To display data on load
    useEffect(() => {
        console.log("CATEGORY ID:", category_id);
        axios
            .get("http://localhost:5000/api/hacks/category/" + category_id)
            .then((res) => {
                console.log(res);
                setHacks(res.data.all_hacks);
                setCatName(res.data.all_hacks?.[0]?.category_name);
                setCatImg(res.data.all_hacks?.[0]?.cat_img);
            })
            .catch((err) => {
                console.log(
                    "Error with get_all_hacks_with_category_and_user request",
                    err
                );
            });
    }, []);

    useEffect(() => {
        console.log("HACKS:", hacks);
        console.log("CATEGORY NAME:", catName, "CATEGORY IMG:", catImg);
    }, [hacks]);

    // Sort hack titles alphabetically
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
        <Paper
            elevation={2}
            sx={{
                mx: { xs: 0, sm: 10, md: 20, lg: 30 },
                mt: { xs: 0, sm: 2 },
                height: { xs: "100%", md: "auto" },
            }}
        >
            <Stack
                direction="row"
                sx={{ display: "flex", justifyContent: "space-between" }}
            >
                <div>
                    <Typography
                        variant="h3"
                        component="h1"
                        sx={{
                            mb: 3,
                            mt: 2,
                            mx: 2,
                            color: "#478D95",
                            fontWeight: "bold",
                        }}
                    >
                        {catName}
                    </Typography>

                    <List sx={{ mx: 2 }}>
                        {!!hacks
                            ? hacks.sort(sortList).map((hackData, index) => {
                                  return (
                                      <div key={index}>
                                          <Link
                                              component={RouterLink}
                                              to={`/hacks/view/${hackData.id}`}
                                              underline="hover"
                                              className="hackItems"
                                          >
                                              <span
                                                  data-content={`${hackData.title} Hover`}
                                                  aria-hidden="true"
                                              ></span>
                                              {hackData.title}
                                          </Link>
                                          <Divider />
                                      </div>
                                  );
                              })
                            : null}
                    </List>
                </div>
                <div className="catPageDiv">
                    <img src={catImg} alt={catName} className="catPage" />
                </div>
            </Stack>
        </Paper>
    );
};

export default CategoryPage;
