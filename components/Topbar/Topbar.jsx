import {Box, IconButton, useTheme} from "@mui/material";
import React, {useContext} from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import {ColorModeContext, tokens} from "../theme.js";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box display="flex" justifyContent="space-between" p={2}>

            <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box display="flex" alignItems="center">
                    <DashboardIcon />
                    <Typography variant="body1" ml={1}>Dashboard</Typography>
                </Box>
            </Link>

            <Box/>

            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon/>
                    ) : (
                        <LightModeOutlinedIcon/>
                    )}
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon/>
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default Topbar;
