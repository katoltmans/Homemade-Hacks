import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { Grid, Paper, Typography, Button, MobileStepper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";

const WelcomePage = () => {
    const [hacks, setHacks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = categories.length;

    useEffect(() => {
        // GET request to find all hacks
        axios
            .get("http://localhost:5000/api/hacks/view")
            .then((res) => {
                console.log(res.data);
                setHacks(res.data.all_hacks);
                setCategories(res.data.all_categories);
                console.log(categories);
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

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step, number) => {
        setActiveStep(step);
    };

    return (
        <Typography>Welcome Page</Typography>

        // <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        //     <Paper
        //         square
        //         elevation={0}
        //         sx={{
        //             display: "flex",
        //             alignItems: "center",
        //             height: 50,
        //             pl: 2,
        //             bgcolor: "background.default",
        //         }}
        //     >
        //         <Typography>{categories.name[activeStep].label}</Typography>
        //     </Paper>
        //     <AutoPlaySwipeableViews
        //         axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        //         index={activeStep}
        //         onChangeIndex={handleStepChange}
        //         enableMouseEvents
        //     >
        //         {categories.cat_img.map((step, index) => (
        //             <div key={step.label}>
        //                 {Math.abs(activeStep - index) <= 2 ? (
        //                     <Box
        //                         component="img"
        //                         sx={{
        //                             height: 255,
        //                             display: "block",
        //                             maxWidth: 400,
        //                             overflow: "hidden",
        //                             width: "100%",
        //                         }}
        //                         src={step.imgPath}
        //                         alt={step.label}
        //                     />
        //                 ) : null}
        //             </div>
        //         ))}
        //     </AutoPlaySwipeableViews>
        //     <MobileStepper
        //         steps={maxSteps}
        //         position="static"
        //         activeStep={activeStep}
        //         nextButton={
        //             <Button
        //                 size="small"
        //                 onClick={handleNext}
        //                 disabled={activeStep === maxSteps - 1}
        //             >
        //                 Next
        //                 {theme.direction === "rtl" ? (
        //                     <KeyboardArrowLeft />
        //                 ) : (
        //                     <KeyboardArrowRight />
        //                 )}
        //             </Button>
        //         }
        //         backButton={
        //             <Button
        //                 size="small"
        //                 onClick={handleBack}
        //                 disabled={activeStep === 0}
        //             >
        //                 {/* {theme.direction === "rtl" ? ( */}
        //                 <KeyboardArrowRight />
        //                 {/* ) : ( */}
        //                 <KeyboardArrowLeft />
        //                 {/* )} */}
        //                 Back
        //             </Button>
        //         }
        //     />
        // </Box>
        // Source for base carousel code: https://mui.com/material-ui/react-stepper/#text-with-carousel-effect
    );
};

export default WelcomePage;
