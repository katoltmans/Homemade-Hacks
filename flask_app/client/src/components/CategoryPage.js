import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";

const CategoryPage = (props) => {
    const navigate = useNavigate();
    const [hacks, setHacks] = useState({});
    const [categories, setCategories] = useState([]);

    // To display data on load
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/hacks/view/")
            .then((res) => {
                console.log(res);
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
        console.log("HACKS:", hacks);
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
        <Paper elevation={2} sx={{ p: 5, m: 3 }}>
            <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
                Category Name
            </Typography>
            <img href={categories.cat_img}/>
        </Paper>
    );
};

export default CategoryPage;
