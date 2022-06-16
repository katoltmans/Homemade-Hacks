import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Grid,
    Paper,
    TextField,
    Typography,
    Button,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";

const AddHack = (props) => {
    const navigate = useNavigate();
    const { user, setUser } = props;
    const [hack, setHack] = useState({
        title: "",
        supplies: [{ supply_name: "", quantity: "" }],
        instructions: "",
        category_id: "",
        user_id: "",
    });
    const [supplies, setSupplies] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [errors, setErrors] = useState([]);

    const onChangeHandler = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setHack({
            ...hack,
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
        // Create hack object
        let tempHack = { ...hack, user_id: user.id };
        console.log(JSON.stringify(tempHack));
        // let hack = {
        //     title: title,
        //     category_name: formData["category_name"],
        //     supplies: formData["supplies"],
        //     instructions: formData["instructions"],
        //     user_id: user.id,
        // };

        axios
            .post("http://localhost:5000/api/hacks/new", tempHack)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                try {
                    //navigate("/");
                    console.log(res?.data?.message);
                } catch (error) {
                    console.error(error);
                }
                navigate("/");
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
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Category
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="category_id"
                                    label="Category"
                                    onChange={onChangeHandler}
                                >
                                    <MenuItem value={1}>Cleaning</MenuItem>
                                    <MenuItem value={2}>Wardrobe</MenuItem>
                                    <MenuItem value={3}>Item Repair</MenuItem>
                                    <MenuItem value={4}>Pest Control</MenuItem>
                                    <MenuItem value={5}>Home Repair</MenuItem>
                                    <MenuItem value={6}>
                                        Lawn And Garden
                                    </MenuItem>
                                    <MenuItem value={7}>Organization</MenuItem>
                                    <MenuItem value={8}>Travel</MenuItem>
                                </Select>
                            </FormControl>
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

                        {supplies.map((supply_item, index) => {
                            return (
                                <Grid container item spacing={3} key={index}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            name="supplies"
                                            defaultValue={
                                                supply_item.supply_name
                                            }
                                            label="Supply Name"
                                            variant="outlined"
                                            onChange={onChangeHandler}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            name="supplies"
                                            defaultValue={supply_item.quantity}
                                            label="Quantity"
                                            variant="outlined"
                                            onChange={onChangeHandler}
                                        />
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Button
                        variant="contained"
                        sx={{ ml: 3, mt: 1 }}
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
                    {instructions.map((step, index) => {
                        return (
                            <Grid item xs={12} key={index}>
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
                        sx={{ ml: 3, mt: 1 }}
                        onClick={addInstructionHandler}
                    >
                        Add Step
                    </Button>
                </Grid>
                <Button
                    variant="contained"
                    sx={{ mt: 5 }}
                    onClick={onSubmitHandler}
                >
                    Submit
                </Button>
            </Box>
        </Paper>
    );
};

export default AddHack;
