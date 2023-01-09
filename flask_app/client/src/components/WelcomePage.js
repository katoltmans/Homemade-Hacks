import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, Typography, Button, MobileStepper } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Box } from "@mui/system";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const WelcomePage = (props) => {
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
    const [hacks, setHacks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        // GET request to find all hacks
        axios
            .get("http://localhost:5000/api/hacks/view")
            .then((res) => {
                console.log(res);
                setHacks(res.data.all_hacks);
                setCategories(res.data.all_categories);
                console.log(res.data.all_categories);
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

    useEffect(() => {
        console.log("CATEGORIES: ", JSON.stringify(categories));
    }, [categories]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <>
            {!!categories && categories?.length > 0 ? (
                <Box
                    sx={{
                        maxWidth: 1000,
                        flexGrow: 1,
                        m: "auto",
                    }}
                >
                    <AutoPlaySwipeableViews
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {categories.map((step, index) => (
                            <div key={step.name}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <Box
                                        sx={{
                                            height: 700,
                                            display: "block",
                                            maxWidth: 1920,
                                            overflow: "hidden",
                                            width: "100%",
                                            backgroundImage: `url(${step.hd_img})`,
                                            backgroundAttachment: "fixed",
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    >
                                        <Paper
                                            square
                                            elevation={0}
                                            sx={{
                                                alignItems: "center",
                                                padding: "5px",
                                                pl: 2,
                                                bgcolor:
                                                    "rgba(71, 141, 149, 0.3)",

                                                color: "#fff",
                                                mt: 5,
                                            }}
                                        >
                                            {
                                                <Typography
                                                    variant="h3"
                                                    sx={{ mb: 2 }}
                                                >
                                                    {
                                                        categories[activeStep]
                                                            ?.name
                                                    }
                                                </Typography>
                                            }
                                        </Paper>
                                    </Box>
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                    <MobileStepper
                        steps={categories.length}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === categories.length - 1}
                            >
                                Next
                                <KeyboardArrowRight />
                            </Button>
                        }
                        backButton={
                            <Button
                                size="small"
                                onClick={handleBack}
                                disabled={activeStep === 0}
                            >
                                <KeyboardArrowLeft />
                                Back
                            </Button>
                        }
                    />
                </Box>
            ) : (
                <Typography>Welcome Page</Typography>
            )}
        </>
        // Source for base carousel code: https://mui.com/material-ui/react-stepper/#text-with-carousel-effect
    );
};

export default WelcomePage;
