import {useLocation, useNavigate} from "react-router-dom";
import React, {useRef} from "react";
import {errorHandler} from "../../../components/Utils/errorHandler.js";
import DocumentTitle from "../../../components/DocumentTitle.jsx";
import {Box, CssBaseline} from "@mui/material";
import FormTitle from "../../../components/Generics/FormTitle.jsx";
import Container from "@mui/material/Container";
import DefaultForm from "../../../components/Forms/TypeForm.jsx";
import {useCreateTypeMutation} from "../../../redux/memos/type/typeApiSlice.js";

const CreateTypePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const previousPath = useRef(location.state?.from?.pathname ?? '/admin/users/memos/types');

    const [createType, {isLoading}] = useCreateTypeMutation();

    const handleSubmit = async (values) => {
        try {
            await createType({data: values}).unwrap();
            navigate('/admin/users/memos/types');
        } catch (err) {
            errorHandler(err.data.message);
        }
    };

    return(
        <Container  component="main" maxWidth="xl">
            <DocumentTitle>Create new type</DocumentTitle>
            <CssBaseline/>

            <Box sx={{ mt: 2 }}>
                <FormTitle title={"Create new type"} backLinkPath={previousPath} />
                <DefaultForm
                    defaultCurrent={{
                        title: ''
                    }}
                    handleSubmit={handleSubmit}
                />
            </Box>
        </Container>
    )
}

export default CreateTypePage;
