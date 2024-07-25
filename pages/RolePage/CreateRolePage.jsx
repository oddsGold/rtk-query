import {useLocation, useNavigate} from "react-router-dom";
import React, {useRef} from 'react';
import DocumentTitle from "../../components/DocumentTitle.jsx";
import {Box, CssBaseline} from "@mui/material";
import Container from "@mui/material/Container";
import FormTitle from "../../components/Generics/FormTitle.jsx";
import {useCreateRoleMutation, useResourcesQuery} from "../../redux/users/usersApiSlice.js";
import {errorHandler} from "../../components/Utils/errorHandler.js";
import DefaultForm from "../../components/Forms/RoleForm.jsx";

const CreateRolePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const previousPath = useRef(location.state?.from?.pathname ?? '/admin/roles');

    const { data: resources, error: isResourcesError, isLoading: isResourcesLoading } = useResourcesQuery();
    const [createRole, {isLoading}] = useCreateRoleMutation();
    const handleSubmit = async (values) => {
        try {
            await createRole({data: values}).unwrap();
            navigate('/admin/roles');
        } catch (err) {
            errorHandler(err.data.message);
        }
    };

    return(
        <Container  component="main" maxWidth="xl">
            <DocumentTitle>Create new role</DocumentTitle>
            <CssBaseline/>
            <Box sx={{ mt: 2 }}>
                <FormTitle title={"Create new role"} backLinkPath={previousPath} />
                <DefaultForm
                    defaultCurrent={{
                        label: '',
                        resources: []
                    }}
                    handleSubmit={handleSubmit}
                    resources={resources}
                />
            </Box>
        </Container>
    )
}

export default CreateRolePage;
