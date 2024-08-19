import React, {useState} from 'react';
import {ColorModeContext, useMode} from "./theme.js";
import {Box, CssBaseline} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import Sidebar from "./Sidebar/Sidebar.jsx";
import Topbar from "./Topbar/Topbar.jsx";
import {useGetAccountQuery, useLogoutMutation} from "../redux/auth/authApiSlice.js";
import {Loading} from "./LoadingBar/Loading.jsx";
import {errorHandler} from "./Utils/errorHandler.js";

const AuthenticatedLayout = ({children}) => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const { data: user, error: isAccountError, isLoading: isAccountLoading } = useGetAccountQuery();
    const [logout, { isLoading: logoutLoading }] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            errorHandler('Logout failed');
        }
    };

    const isLoading = isAccountLoading || logoutLoading;

    return (
        isLoading ? (
            <Loading />
        ) : (
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                        <Sidebar
                            isSidebar={isSidebar}
                            user={user}
                            isLoading={isLoading}
                        />
                        <main className="content">
                            <Topbar setIsSidebar={setIsSidebar}  handleLogout={handleLogout}  user={user} />
                            <Box sx={{ p: 2 }}>
                                {children}
                            </Box>
                        </main>
                    </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
        )
    );
}

export default AuthenticatedLayout;
