import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import 'react-pro-sidebar/dist/css/styles.css';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import {tokens} from "../theme.js";
import {Loading} from "../LoadingBar/Loading.jsx";
import {useGetMenuItemsQuery} from "../../redux/auth/authApiSlice.js";
import Item from "./Item.jsx";

const Sidebar = ({user, handleLogout, isLoading}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');
    const { data: menuItemsData, isLoading: isMenuItemsLoading } = useGetMenuItemsQuery();
    const [openItems, setOpenItems] = useState([]);

    const handleClick = (index) => {
        setOpenItems((prevOpenItems) => {
            const isOpen = prevOpenItems.includes(index);
            if (isOpen) {
                return prevOpenItems.filter((item) => item !== index);
            } else {
                return [...prevOpenItems, index];
            }
        });
    };

    return (
        <Box
            sx={{
                '& .pro-sidebar': {
                    width: '320px',
                    minWidth: '320px'
                },
                '& .pro-sidebar.collapsed': {
                    width: '80px',
                    minWidth: '80px'
                },
                '& .pro-sidebar-inner': {
                    background: `${colors.primary[400]} !important`,
                },
                '& .pro-icon-wrapper': {
                    backgroundColor: 'transparent !important',
                },
                '& .pro-inner-item': {
                    padding: '10px 35px 10px 20px !important',
                },
                '& .pro-inner-item:hover': {
                    color: '#e9870c !important',
                },
                '& .pro-menu-item.active': {
                    color: '#e9870c !important',
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    ADMIN PANEL
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`../../../build/assets/user-icon-2048x2048-ihoxz4vq.png`}
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    {user.login}
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    {user.role.label}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box>

                        {isMenuItemsLoading ? (
                            <Loading />
                        ) : (
                            <>
                                {menuItemsData.map((item, index) => (
                                    <div key={item.id}>
                                        <Item
                                            title={item.name}
                                            to={item.urn}
                                            selected={selected}
                                            setSelected={setSelected}
                                            isOpen={openItems.includes(index)}
                                            handleClick={() => handleClick(index)}
                                            hasSubmenu={!!item.submenu}
                                        >
                                            {item.submenu && item.submenu.map(subitem => (
                                                <Item
                                                    key={subitem.id}
                                                    title={subitem.name}
                                                    to={subitem.urn}
                                                    // icon={}
                                                    selected={selected}
                                                    setSelected={setSelected}
                                                />
                                            ))}
                                        </Item>
                                    </div>
                                ))}
                            </>
                        )}
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
