import React, {useRef} from 'react';
import {
    Container,
    Box,
    CssBaseline
} from '@mui/material';
import FormTitle from "../../components/Generics/FormTitle.jsx";
import DefaultForm from "../../components/Forms/UserForm.jsx";
import {errorHandler} from "../../components/Utils/errorHandler.js";
import {useCurrentUserQuery, useRolesQuery, useUpdateUserMutation} from "../../redux/users/usersApiSlice.js";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import {Loading} from "../../components/LoadingBar/Loading.jsx";

const EditUserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const previousPath = useRef(location.state?.from?.pathname ?? '/admin/users');

    const { data: current, error, isLoading: isCurrentUserLoading } = useCurrentUserQuery(id);
    const { data: roles, error: isRolesError, isLoading: isRolesLoading } = useRolesQuery(1,30);
    const [updateUser, {isLoading: isUpdateUserLoading}] = useUpdateUserMutation();

    if (isCurrentUserLoading || isRolesLoading) {
        return <Loading />;
    }

    if (!current || !roles) {
        return <div>Data not found</div>;
    }

    const handleSubmit = async (values) => {
        try {
            const updatedValues = {
                ...values,
                role: parseInt(values.role)
            };
            await updateUser({data: updatedValues}).unwrap();
            navigate('/admin/users');
        } catch (err) {
            errorHandler(err.data.message);
        }
    };

    return (
        <Container  component="main" maxWidth="xl">
            <DocumentTitle>Edit user</DocumentTitle>
            <CssBaseline/>
            <Box sx={{ mt: 2 }}>
                <FormTitle title={"Edit user"} backLinkPath={previousPath} />
                <DefaultForm
                    current={current ? {
                        ...current,
                        password: '',
                        password_confirmation: '',
                        role: current.role.id
                    } : null}
                    handleSubmit={handleSubmit}
                    roles={roles}
                />
            </Box>
        </Container>
    );
};

export default EditUserPage;
