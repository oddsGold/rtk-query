import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useRef} from "react";
import {Loading} from "../../../components/LoadingBar/Loading.jsx";
import {errorHandler} from "../../../components/Utils/errorHandler.js";
import DocumentTitle from "../../../components/DocumentTitle.jsx";
import {Box, CssBaseline} from "@mui/material";
import FormTitle from "../../../components/Generics/FormTitle.jsx";
import Container from "@mui/material/Container";
import DefaultForm from "../../../components/Forms/TypeForm.jsx";
import {useCurrentTypeQuery, useUpdateTypeMutation} from "../../../redux/memos/type/typeApiSlice.js";

const EditTypePage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const previousPath = useRef(location.state?.from?.pathname ?? '/admin/users/memos/types');

    const { data: currentType, error, isLoading:  isCurrentTypeLoading } = useCurrentTypeQuery(id);
    const [updateType, {isLoading: isUpdateTypeLoading}] = useUpdateTypeMutation();

    if (isCurrentTypeLoading) {
        return <Loading />;
    }

    if (!currentType) {
        return <div>Data not found</div>;
    }

    const handleSubmit = async (values) => {
        try {
            await updateType({data: values}).unwrap();
            navigate('/admin/users/memos/types');
        } catch (err) {
            errorHandler(err.data.message);
        }
    };

    return (
        <Container  component="main" maxWidth="xl">
            <DocumentTitle>Edit news</DocumentTitle>
            <CssBaseline/>

            <Box sx={{ mt: 2 }}>
                <FormTitle title={"Edit type"} backLinkPath={previousPath} />
                <DefaultForm
                    current={currentType}
                    handleSubmit={handleSubmit}
                />
            </Box>
        </Container>
    )
}

export default EditTypePage;
