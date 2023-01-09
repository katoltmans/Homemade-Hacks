import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const UpdateHack = (props) => {
    const navigate = useNavigate();
    const { user, setUser } = props;
    const [hack, setHack] = useState(null);
    const { id } = useParams();
    const [supplies, setSupplies] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    // UseEffect to request and autofill hack data
    useEffect(() => {
        console.log(id);
        axios
            .get("http://localhost:5000/api/hacks/view/" + id) //Remember the slash at the end of the IP address!
            .then((res) => {
                console.log(res.data);
                setHack(res.data);
                setSupplies(JSON.parse(res.data.supplies));
                setInstructions(JSON.parse(res.data.instructions));
                setLoading(false);
            })
            .catch((err) => {
                console.log("Error with view_one_hack request", err);
            });
    }, [id]);

    // Handler to update hack display and data upon input
    const onChangeHandler = (e) => {
        console.log(e.target.name);
        setHack({
            ...hack,
            [e.target.name]: e.target.value,
        });
    };

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

        // Post request to update a hack
        axios
            .post("http://localhost:5000/api/hacks/update/" + id, tempHack)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                if (!res.data.errors) {
                    navigate("/hacks/view/" + id);
                } else {
                    setErrors(res.data.errors);
                }
            })
            .catch((err) => {
                console.log("Error with post update request (client)", err);
                setErrors(err.response.data?.error?.errors);
                console.log("ERROR:", errors);
            });
    };

    const deleteRowHandler = (index, setFunction, elemArray) => {
        setFunction(elemArray.filter((elem, i) => i !== index));
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
                    backgroundImage: "url('/static/img/wallArt.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Photo by Teona Swift: https://www.pexels.com/photo/crop-florist-attacking-twig-on-wall-6913837/ */}
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
                    Update Hack
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
            {loading ? (
                <Box sx={{ height: "100%" }}>
                    <p>Loading...</p>
                </Box>
            ) : (
                <>
                    <Stack spacing={2} sx={{ p: 2 }}>
                        <Grid container item spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    name="title"
                                    label="Title"
                                    defaultValue={hack.title}
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
                                        defaultValue={hack.category_id}
                                        onChange={onChangeHandler}
                                        // value={hack.category_id}
                                    >
                                        <MenuItem value={1}>Cleaning</MenuItem>
                                        <MenuItem value={2}>Wardrobe</MenuItem>
                                        <MenuItem value={3}>
                                            Item Repair
                                        </MenuItem>
                                        <MenuItem value={4}>
                                            Pest Control
                                        </MenuItem>
                                        <MenuItem value={5}>
                                            Home Repair
                                        </MenuItem>
                                        <MenuItem value={6}>
                                            Lawn And Garden
                                        </MenuItem>
                                        <MenuItem value={7}>
                                            Organization
                                        </MenuItem>
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

                        {supplies.map((supply_item, index) => {
                            return (
                                <Grid container rowSpacing={1} key={index}>
                                    <Grid item xs={11} md={6}>
                                        <TextField
                                            fullWidth
                                            name="supplies"
                                            defaultValue={
                                                supply_item.supply_name
                                            }
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
                                    <Grid item xs={5}>
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
                                    <Grid item xs={1}>
                                        <Button
                                            sx={{ color: "#C64040" }}
                                            onClick={() =>
                                                deleteRowHandler(
                                                    index,
                                                    setSupplies,
                                                    supplies
                                                )
                                            }
                                        >
                                            <HighlightOffIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                            );
                        })}
                        <Grid container item>
                            <Button
                                variant="contained"
                                onClick={addSuppliesHandler}
                            >
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

                        {instructions.map((step, index) => {
                            return (
                                <Grid container rowSpacing={1} key={index}>
                                    <Grid item xs={11}>
                                        <TextField
                                            fullWidth
                                            name="instructions"
                                            value={step}
                                            label="Instruction step"
                                            // defaultValue={}
                                            variant="outlined"
                                            onChange={(e) =>
                                                onChangeHandlerInstructions(
                                                    e,
                                                    index
                                                )
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Button
                                            sx={{ color: "#C64040" }}
                                            onClick={() =>
                                                deleteRowHandler(
                                                    index,
                                                    setInstructions,
                                                    instructions
                                                )
                                            }
                                        >
                                            <HighlightOffIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                            );
                        })}

                        <Grid container item>
                            <Button
                                variant="contained"
                                onClick={addInstructionHandler}
                            >
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
                </>
            )}
        </Paper>
    );
};

export default UpdateHack;
