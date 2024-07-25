import { Box, Collapse, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme.js";
import { MenuItem } from "react-pro-sidebar";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";
import React from "react";

const Item = ({ title, to, icon, selected, setSelected, children, isOpen, handleClick, hasSubmenu }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleItemClick = () => {
        if (!hasSubmenu) {
            setSelected(title);
        }
        if (handleClick) {
            handleClick();
        }
    };

    return (
        <>
            <MenuItem
                active={selected === title}
                style={{ color: colors.grey[100] }}
                onClick={handleItemClick}
                icon={icon}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                    <Typography>{title}</Typography>
                    {hasSubmenu && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                </Box>
                {to && <Link to={to} />}
            </MenuItem>
            {children && (
                <Collapse in={isOpen}>
                    <Box pl={3}>
                        {children}
                    </Box>
                </Collapse>
            )}
        </>
    );
};

export default Item;
