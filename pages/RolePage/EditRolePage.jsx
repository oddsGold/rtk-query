import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useRef} from "react";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import {Box, CssBaseline} from "@mui/material";
import FormTitle from "../../components/Generics/FormTitle.jsx";
import Container from "@mui/material/Container";
import {errorHandler} from "../../components/Utils/errorHandler.js";
import DefaultForm from "../../components/Forms/RoleForm.jsx";
import {useCurrentRoleQuery, useResourcesQuery, useUpdateRoleMutation} from "../../redux/users/usersApiSlice.js";
import {Loading} from "../../components/LoadingBar/Loading.jsx";

const EditRolePage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const previousPath = useRef(location.state?.from?.pathname ?? '/admin/roles');

    const { data: currentRole, error, isLoading:  isCurrentRoleLoading } = useCurrentRoleQuery(id);
    const { data: resources, error: isResourcesError, isLoading: isResourcesLoading } = useResourcesQuery();
    const [updateRole, {isLoading: isUpdateRoleLoading}] = useUpdateRoleMutation();

    if (isCurrentRoleLoading || isResourcesLoading) {
        return <Loading />;
    }

    if (!currentRole || !resources) {
        return <div>Data not found</div>;
    }

    const handleSubmit = async (values) => {
        try {
            await updateRole({data: values}).unwrap();
            navigate('/admin/roles');
        } catch (err) {
            errorHandler(err.data.message);
        }
    };

    return(
        <Container  component="main" maxWidth="xl">
            <DocumentTitle>Edit role</DocumentTitle>
            <CssBaseline/>

            <Box sx={{ mt: 2 }}>
                <FormTitle title={"Edit role"} backLinkPath={previousPath} />
                <DefaultForm
                    current={currentRole}
                    handleSubmit={handleSubmit}
                    resources={resources}
                />
            </Box>
        </Container>
    )
}

export default EditRolePage;
