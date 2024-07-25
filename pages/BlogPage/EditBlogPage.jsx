import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useRef} from "react";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import {Box, CssBaseline} from "@mui/material";
import Container from "@mui/material/Container";
import FormTitle from "../../components/Generics/FormTitle.jsx";
import {errorHandler} from "../../components/Utils/errorHandler.js";
import {Loading} from "../../components/LoadingBar/Loading.jsx";
import DefaultForm from "../../components/Forms/BlogForm.jsx";
import {useCurrentNewsQuery, useUpdateNewsMutation} from "../../redux/blog/newsApiSlice.js";

const EditBlogPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const previousPath = useRef(location.state?.from?.pathname ?? '/admin/news');

    const { data: currentNews, error, isLoading:  isCurrentNewsLoading } = useCurrentNewsQuery(id);
    const [updateNews, {isLoading: isUpdateNewsLoading}] = useUpdateNewsMutation();

    if (isCurrentNewsLoading) {
        return <Loading />;
    }

    if (!currentNews) {
        return <div>Data not found</div>;
    }
    const handleSubmit = async (values) => {
        try {
            await updateNews({data: values}).unwrap();
            navigate('/admin/news');
        } catch (err) {
            errorHandler(err.data.message);
        }
    };

    return (
        <Container  component="main" maxWidth="xl">
            <DocumentTitle>Edit news</DocumentTitle>
            <CssBaseline/>

            <Box sx={{ mt: 2 }}>
                <FormTitle title={"Edit news"} backLinkPath={previousPath} />
                <DefaultForm
                    current={currentNews}
                    handleSubmit={handleSubmit}
                />
            </Box>
        </Container>
    )
}

export default EditBlogPage;
