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
    Stack,
} from "@mui/material";

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

    // Handler to update hack on input change
    const onChangeHandler = (e) => {
        console.log(e.target.name);
        setHack({
            ...hack,
            [e.target.name]: e.target.value,
        });
    };

    // Handler to update supplies on input change
    const onChangeHandlerSupplies = (e, index, type) => {
        console.log(e.target.name);
        console.log(e.target.value);
        let newSupplies = [...supplies];
        newSupplies[index][type] = e.target.value;
        setSupplies(newSupplies);
    };

    // Handler to update instructions on input change
    const onChangeHandlerInstructions = (e, index) => {
        console.log(e.target.name);
        console.log(e.target.value);
        let newInstructions = [...instructions];
        newInstructions[index] = e.target.value;
        setInstructions(newInstructions);
    };

    // Handlers to add supplies/instructions for later parsing into list
    useEffect(() => {
        console.log("INSTRUCTIONS", instructions);
    }, [instructions]);

    // Handler to add supplies and quantities to supplies object when field is added
    const addSuppliesHandler = () => {
        setSupplies([...supplies, { supply_name: "", quantity: "" }]);
    };

    // Handler to add instructions to instructions array when field is added
    const addInstructionHandler = () => {
        setInstructions([...instructions, ""]);
    };

    // Handler to post hack with hack details connected to creator's user ID
    const onSubmitHandler = (e) => {
        console.log("submitting hack");
        e.preventDefault();
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
                console.log("Error with post Add a Hack request (client)", err);
                setErrors(err.response.data?.error?.errors);
                console.log("ERROR:", errors);
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
                    height: { xs: 150, sm: 250 },
                    display: "block",
                    maxWidth: 1920,
                    overflow: "hidden",
                    width: "100%",
                    backgroundImage: "url('/static/img/bakingSoda.jpg')",
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
            <Stack spacing={2} sx={{ p: 2 }}>
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
                                <MenuItem value={6}>Lawn And Garden</MenuItem>
                                <MenuItem value={7}>Organization</MenuItem>
                                <MenuItem value={8}>Travel</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid
                    container
                    item
                    spacing={0}
                    sx={{ flexDirection: "column", mt: 3 }}
                >
                    <Typography
                        variant="h5"
                        color="inherit"
                        component="h3"
                        sx={{ my: 0, fontWeight: "bold" }}
                    >
                        Supplies Names And Quantities
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        component="p"
                        sx={{ mt: 0 }}
                    >
                        Please enter supply names and related quantity:
                    </Typography>
                </Grid>
                <Grid container rowSpacing={1}>
                    {supplies.map((supply_item, index) => {
                        return (
                            <Grid container item spacing={1} key={index}>
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
                <Grid container item>
                    <Button variant="contained" onClick={addSuppliesHandler}>
                        Add Supplies
                    </Button>
                </Grid>

                <Grid
                    container
                    spacing={0}
                    sx={{ flexDirection: "column", mt: 3 }}
                >
                    <Typography
                        variant="h5"
                        color="inherit"
                        component="h3"
                        sx={{ mt: 5, fontWeight: "bold" }}
                    >
                        Instructions
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        component="p"
                    >
                        Please enter step by step instructions:
                    </Typography>
                </Grid>
                <Grid container rowSpacing={1}>
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
                </Grid>
                <Grid container item>
                    <Button variant="contained" onClick={addInstructionHandler}>
                        Add Step
                    </Button>
                </Grid>
                <Stack sx={{ display: "flex", alignItems: "flex-end" }}>
                    <Button
                        variant="contained"
                        sx={{ my: 5, width: "25%" }}
                        onClick={onSubmitHandler}
                    >
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default AddHack;
