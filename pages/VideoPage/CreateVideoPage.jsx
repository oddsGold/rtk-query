import {useLocation, useNavigate} from "react-router-dom";
import React, {useRef} from "react";
import {errorHandler} from "../../components/Utils/errorHandler.js";
import Container from "@mui/material/Container";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import {Box, CssBaseline} from "@mui/material";
import FormTitle from "../../components/Generics/FormTitle.jsx";
import DefaultForm from "../../components/Forms/VideoForm.jsx";
import {useCreateVideoMutation} from "../../redux/video/videoApiSlice.js";

const CreateVideoPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const previousPath = useRef(location.state?.from?.pathname ?? '/admin/videos');

    const [createVideo, {isLoading}] = useCreateVideoMutation();

    const handleSubmit = async (values) => {
        try {
            await createVideo({data: values}).unwrap();
            navigate('/admin/videos');
        } catch (err) {
            errorHandler();
        }
    };

    return(
        <Container  component="main" maxWidth="xl">
            <DocumentTitle>Create new Video</DocumentTitle>
            <CssBaseline/>

            <Box sx={{ mt: 2 }}>
                <FormTitle title={"Create new video"} backLinkPath={previousPath} />
                <DefaultForm
                    defaultCurrent={{
                        title: '',
                        url: ''
                    }}
                    handleSubmit={handleSubmit}
                />
            </Box>
        </Container>
    )
}
export default CreateVideoPage;
