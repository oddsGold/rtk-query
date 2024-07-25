import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useRef} from "react";
import {Loading} from "../../components/LoadingBar/Loading.jsx";
import {errorHandler} from "../../components/Utils/errorHandler.js";
import Container from "@mui/material/Container";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import {Box, CssBaseline} from "@mui/material";
import FormTitle from "../../components/Generics/FormTitle.jsx";
import DefaultForm from "../../components/Forms/VideoForm.jsx";
import {useCurrentVideoQuery, useUpdateVideoMutation} from "../../redux/video/videoApiSlice.js";

const EditVideoPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const previousPath = useRef(location.state?.from?.pathname ?? '/admin/videos');

    const { data: currentVideo, error, isLoading:  isCurrentVideoLoading } = useCurrentVideoQuery(id);
    const [updateVideo, {isLoading: isUpdateVideoLoading}] = useUpdateVideoMutation();

    if (isCurrentVideoLoading) {
        return <Loading />;
    }

    if (!currentVideo) {
        return <div>Data not found</div>;
    }

    const handleSubmit = async (values) => {
        try {
            await updateVideo({data: values}).unwrap();
            navigate('/admin/videos');
        } catch (err) {
            errorHandler();
        }
    };

    return (
        <Container  component="main" maxWidth="xl">
            <DocumentTitle>Edit video</DocumentTitle>
            <CssBaseline/>

            <Box sx={{ mt: 2 }}>
                <FormTitle title={"Edit video"} backLinkPath={previousPath} />
                <DefaultForm
                    current={currentVideo}
                    handleSubmit={handleSubmit}
                />
            </Box>
        </Container>
    )
}

export default EditVideoPage;
