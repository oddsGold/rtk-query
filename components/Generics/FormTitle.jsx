import React from "react";
import {Box, styled, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {NavLink} from "react-router-dom";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 16px',
    backgroundColor: '#4caf50',
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
        backgroundColor: '#388e3c',
    },
    '&:focus': {
        outline: 'none',
    },
}));
export default function FormTitle({title, backLinkPath}) {
     return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StyledNavLink to={backLinkPath.current}>
                    <ArrowBackIcon sx={{ mr: 1 }} />
                    Back
                </StyledNavLink>

                <Typography variant="h4" gutterBottom sx={{ ml: 2, mb: 0 }}>
                    {title}
                </Typography>
            </Box>
        </Box>
    )
}
