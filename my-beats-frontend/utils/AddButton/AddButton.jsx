import React from "react";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { AddCircleOutline, SaveAltOutlined } from "@mui/icons-material";
import { connect } from "react-redux";

function AddButton({ heading, title, handleAddClick, justifyContent = "flex-end" }) {
    const Root = styled("div")(({ theme }) => ({
        display: "flex",
        justifyContent: justifyContent,
        placeItems: "center",
        padding: "30px 0",
        margin: "10px 0",
        [theme.breakpoints.down("md")]: {
            padding: "25px 0",
        },
        [theme.breakpoints.down("md")]: {
            padding: "20px 0",
        },
    }));

    const Heading = styled(Typography)(({ theme }) => ({
        flex: 1,
        fontFamily: "'Gluten', cursive",
        fontWeight: "bold",
        fontSize: 40,
        letterSpacing: 1,
        [theme.breakpoints.down("md")]: {
            fontSize: 30,
        },
        [theme.breakpoints.down("md")]: {
            fontSize: 25,
        },
    }));

    const CustomButton = styled(Button)(({ theme }) => ({
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        color: "white",
        height: 48,
        padding: "0 30px",
        [theme.breakpoints.down("md")]: {
            height: 38,
            padding: "0 25px",
        },
        [theme.breakpoints.down("md")]: {
            height: 30,
            padding: "0 20px",
        },
    }));

    return (
        <Root>
            {heading && <Heading>{heading}</Heading>}
            {title && (
                <CustomButton
                    startIcon={title === "Save" ? <SaveAltOutlined /> : <AddCircleOutline />}
                    onClick={(e) => handleAddClick(e)}
                >
                    {title}
                </CustomButton>
            )}
        </Root>
    );
}

const mapStateToProps = (state) => ({
    loader: state.loader,
});

export default connect(mapStateToProps, null)(AddButton);
