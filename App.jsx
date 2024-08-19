import {Routes, Route, Navigate} from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Layout from './components/Layout';
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import React from "react";
import {LoginFormTfa} from "./components/LoginForm/LoginFormTfa.jsx";
import {useSelector} from "react-redux";
import {selectTFA, selectToken} from "./redux/auth/selectors.js";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import AuthenticatedLayout from "./components/AuthenticatedLayout.jsx";

function App() {
    const tfa = useSelector(selectTFA);
    const token = useSelector(selectToken);

    return (
            <>
                <ToastContainer/>
                <Routes>
                    <Route path="/admin/*" element={<Layout/>}>
                        {token && tfa
                            ? <Route path="login/tfa" element={<LoginFormTfa/>}/>
                            : token && !tfa
                                ? <Route path="*" element=
                                    {
                                        <AuthenticatedLayout>
                                            <PrivateRoutes/>
                                        </AuthenticatedLayout>
                                    }
                                />
                                : <Route path="login" element={<LoginPage/>}/>
                        }

                        <Route
                            path="*"
                            element={
                                token && tfa
                                    ? <Navigate to="/admin/login/tfa"/>
                                    : token && !tfa
                                        ? <Navigate to="/admin/dashboard"/>
                                        : <Navigate to="/admin/login"/>
                            }
                        />
                    </Route>
                </Routes>

            </>
    )
}

export default App;
