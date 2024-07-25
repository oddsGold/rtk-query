import React, {useRef, useState} from 'react';
import {
    Container,
    Box,
    CssBaseline
} from '@mui/material';
import FormTitle from "../../components/Generics/FormTitle.jsx";
import DefaultForm from "../../components/Forms/UserForm.jsx";
import {errorHandler} from "../../components/Utils/errorHandler.js";
import {useCreateUserMutation, useRolesQuery} from "../../redux/users/usersApiSlice.js";
import {useLocation, useNavigate} from "react-router-dom";
import DocumentTitle from "../../components/DocumentTitle.jsx";

const CreateUserPage = () => {
    const navigate = useNavigate();
    const [createUser, {isLoading}] = useCreateUserMutation();
    const { data: roles, error: isRolesError, isLoading: isRolesLoading } = useRolesQuery(1,30);

    const location = useLocation();
    const previousPath = useRef(location.state?.from?.pathname ?? '/admin/users');
    const handleSubmit = async (values) => {
        try {
            await createUser({data: values}).unwrap();
            navigate('/admin/users');
        } catch (err) {
            errorHandler(err.data.message);
        }
    };

    return (
        <Container  component="main" maxWidth="xl">
            <DocumentTitle>Create new user</DocumentTitle>
            <CssBaseline/>
            <Box sx={{ mt: 2 }}>
                <FormTitle title={"Create new user"} backLinkPath={previousPath} />
                <DefaultForm
                    defaultCurrent={{
                        login: '',
                        email: '',
                        role: null,
                        password: '',
                        password_confirmation: '',
                        tfa: true,
                    }}
                    handleSubmit={handleSubmit}
                    roles={roles}
                />
            </Box>
        </Container>
    );
};

export default CreateUserPage;
