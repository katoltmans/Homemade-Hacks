import React, { useEffect, useState } from "react";
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
    List,
    ListItem,
    makeStyles,
} from "@mui/material";

// Photo by Kaboompics .com: https://www.pexels.com/photo/flour-in-a-jar-5765/

const AddHack = (props) => {
    const navigate = useNavigate();
    const { user, setUser } = props;
    const [hack, setHack] = useState({
        title: "",
        supplies: [{ supply_name: "", quantity: "" }],
        instructions: [""],
        category_id: "",
        user_id: "",
    });
    const [supplies, setSupplies] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [errors, setErrors] = useState([]);

    const onChangeHandler = (e) => {
        console.log(e.target.name);
        setHack({
            ...hack,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        console.log("INSTRUCTIONS", instructions);
    }, [instructions]);

    // Handlers to add supplies/instructions for later parsing into list
    const addSuppliesHandler = () => {
        setSupplies([...supplies, { supply_name: "", quantity: "" }]);
    };

    const addInstructionHandler = () => {
        setInstructions([...instructions, ""]);
    };
    const onChangeHandlerSupplies = (e, index, type) => {
        console.log(e.target.name);
        console.log(e.target.value);
        let newSupplies = [...supplies];
        newSupplies[index][type] = e.target.value;
        setSupplies(newSupplies);
    };

    const onChangeHandlerInstructions = (e, index) => {
        console.log(e.target.name);
        console.log(e.target.value);
        let newInstructions = [...instructions];
        newInstructions[index] = e.target.value;
        setInstructions(newInstructions);
    };

    // Handler to post hack with hack details connected to creator's user ID
    const onSubmitHandler = (e) => {
        console.log("submitting hack");
        e.preventDefault();
        //make axios post request
        console.log(user);

        // Create hack object
        let tempHack = {
            ...hack,
            instructions: JSON.stringify(instructions),
            supplies: JSON.stringify(supplies),
            user_id: user.id,
        };
        console.log(JSON.stringify(tempHack));

        // Post request to create a new hack
        axios
            .post("http://localhost:5000/api/hacks/new", tempHack)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                if (!res.data.errors) {
                    navigate("/hacks/view");
                } else {
                    setErrors(res.data.errors);
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
        <Paper
            elevation={2}
            sx={{
                p: { xs: 2, sm: 5 },
                mx: { xs: 0, sm: 10, md: 20, lg: 30 },
                mt: { xs: 0, sm: 3 },
                // backgroundColor: { xs: "#CBDEDF", sm: "#FFF" },
            }}
        >
            <Box
                sx={{
                    height: 250,
                    display: "block",
                    maxWidth: 1920,
                    overflow: "hidden",
                    width: "100%",
                    backgroundImage: "url('/static/img/bakingSoda.jpg')",
                    // backgroundAttachment: "fixed",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
                    Add A Hack
                </Typography>
            </Box>
            {errors ? (
                <List sx={{ mb: 3 }}>
                    {errors.map((error, index) => {
                        return (
                            <ListItem key={index} sx={{ color: "error.main" }}>
                                {error}
                            </ListItem>
                        );
                    })}
                </List>
            ) : null}
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid container item spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="title"
                                label="Title"
                                variant="outlined"
                                onChange={onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                                    value={hack.category_id}
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
                    <Grid
                        container
                        item
                        spacing={1}
                        sx={{ flexDirection: "column" }}
                    >
                        <Typography
                            variant="h6"
                            color="inherit"
                            component="div"
                            sx={{ ml: 3 }}
                        >
                            <h3>Supplies Names And Quantities</h3>
                        </Typography>
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            component="div"
                            sx={{ ml: 3 }}
                        >
                            <p>
                                Please enter supply names and related quantity:
                            </p>
                        </Typography>
                    </Grid>
                    {/* <Grid container item spacing={3}> */}
                    {/* <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                name="supplies"
                                label="Supply"
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
                        </Grid> */}

                    {supplies.map((supply_item, index) => {
                        return (
                            <Grid container item spacing={3} key={index}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        name="supplies"
                                        defaultValue={supply_item.supply_name}
                                        label="Supply Name"
                                        variant="outlined"
                                        onChange={(e) =>
                                            onChangeHandlerSupplies(
                                                e,
                                                index,
                                                "supply_name"
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        name="supplies"
                                        defaultValue={supply_item.quantity}
                                        label="Quantity"
                                        variant="outlined"
                                        onChange={(e) =>
                                            onChangeHandlerSupplies(
                                                e,
                                                index,
                                                "quantity"
                                            )
                                        }
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
                {/* </Grid> */}
                <Grid
                    container
                    item
                    spacing={1}
                    sx={{ flexDirection: "column" }}
                >
                    <Typography
                        variant="h6"
                        color="inherit"
                        component="div"
                        sx={{ ml: 3 }}
                    >
                        <h3>Instructions</h3>
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        component="div"
                        sx={{ ml: 3 }}
                    >
                        <p>Please enter step by step instructions:</p>
                    </Typography>
                </Grid>
                <Grid container item spacing={3}>
                    {/* <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="instructions"
                            label="Instruction step"
                            variant="outlined"
                            onChange={onChangeHandler}
                        />
                    </Grid> */}
                    {instructions.map((step, index) => {
                        return (
                            <Grid item xs={12} key={index}>
                                <TextField
                                    fullWidth
                                    name="instructions"
                                    value={step}
                                    label="Instruction step"
                                    variant="outlined"
                                    onChange={(e) =>
                                        onChangeHandlerInstructions(e, index)
                                    }
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
