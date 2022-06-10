import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Paper, TextField, Typography, Button } from "@mui/material";

const AddHack = () => {
    const navigate = useNavigate();
    const [hack, setHack] = useState({
        title: "",
        supplies: [{ supply_name: "", quantity: "" }],
        instructions: "",
        category_name: "",
        first_name: "",
        last_name: "",
    });
    const [supplies, setSupplies] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [errors, setErrors] = useState([]);

    const onChangeHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const addSuppliesHandler = () => {
        setSupplies([...supplies, ""]);
    };

    const addInstructionHandler = () => {
        setInstructions([...instructions, ""]);
    };

    const onSubmitHandler = (e) => {
        console.log("submitting");
        e.preventDefault();
        //make axios post request
        console.log(user);
        // Post request to create a new author
        axios
            .post("http://localhost:5000/api/hacks/new", user)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                try {
                    //navigate("/");
                    console.log(res?.data?.message);
                } catch (error) {
                    console.error(error);
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

    return (
        <Paper elevation={2} sx={{ p: 5, m: 5 }}>
            <Typography variant="h3" component="h1" sx={{ mb: 3 }}>
                Add A Hack
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid container item spacing={1}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                name="title"
                                label="Title"
                                variant="outlined"
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                name="category_name"
                                label="Category"
                                variant="outlined"
                                onChange={onChangeHandler}
                            />
                        </Grid>
                    </Grid>
                    <Typography
                        variant="h6"
                        color="inherit"
                        component="div"
                        sx={{ ml: 3 }}
                    >
                        <h3>Supplies Needed</h3>
                    </Typography>
                    <Grid container item spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                name="supplies"
                                label="Supply Name"
                                variant="outlined"
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                name="supplies"
                                label="Quantity"
                                variant="outlined"
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        {supplies.map((supply_name, quantity) => {
                            return (
                                <>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            key={supply_name}
                                            name="supplies"
                                            value={supply_name}
                                            label="Supply Name"
                                            variant="outlined"
                                            onChange={onChangeHandler}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            key={quantity}
                                            name="supplies"
                                            value={quantity}
                                            label="Quantity"
                                            variant="outlined"
                                            onChange={onChangeHandler}
                                        />
                                    </Grid>
                                </>
                            );
                        })}
                    </Grid>
                    <Button
                        variant="contained"
                        sx={{ ml: 3 }}
                        onClick={addSuppliesHandler}
                    >
                        Add Supplies
                    </Button>
                </Grid>
                <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ ml: 3 }}
                >
                    <h3>Instructions</h3>
                </Typography>
                <Grid container item spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="instructions"
                            label="Instruction step"
                            variant="outlined"
                            onChange={onChangeHandler}
                        />
                    </Grid>
                </Grid>
                <Grid container item spacing={3}>
                    {instructions.map((step) => {
                        return (
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    key={step}
                                    name="instructions"
                                    value={step}
                                    label="Instruction step"
                                    variant="outlined"
                                    onChange={onChangeHandler}
                                />
                            </Grid>
                        );
                    })}
                    <Button
                        variant="contained"
                        sx={{ ml: 3, mt: 3 }}
                        onClick={addInstructionHandler}
                    >
                        Add Step
                    </Button>
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

export default AddHack;
