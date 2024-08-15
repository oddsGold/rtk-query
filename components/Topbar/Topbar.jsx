import { Box, IconButton, useTheme, Menu, MenuItem, Dialog } from "@mui/material";
import React, { useContext, useState } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import { ColorModeContext, tokens } from "../theme.js";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import SettingsForm from "../Forms/SettingsForm.jsx";

const Topbar = ({ handleLogout, user }) => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const [openSettings, setOpenSettings] = useState(false); // Состояние для открытия диалога
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSettingsOpen = () => {
        setOpenSettings(true);
    };

    const handleSettingsClose = () => {
        setOpenSettings(false);
    };

    return (
        <Box display="flex" justifyContent="space-between" p={2}>

            <Link to="/admin/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box display="flex" alignItems="center">
                    <DashboardIcon />
                    <Typography variant="body1" ml={1}>Dashboard</Typography>
                </Box>
            </Link>

            <Box />

            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>

                <IconButton onClick={handleSettingsOpen}>
                    <SettingsOutlinedIcon />
                </IconButton>

                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <PersonOutlinedIcon />
                </IconButton>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleLogout}>
                        <Typography display="flex" alignItems="center">
                            <LogoutIcon style={{ marginRight: 8 }} /> Logout
                        </Typography>
                    </MenuItem>
                </Menu>
            </Box>

            <Dialog open={openSettings} onClose={handleSettingsClose}>
                <SettingsForm onClose={handleSettingsClose} user={user} />
            </Dialog>
        </Box>
    );
};

export default Topbar;
