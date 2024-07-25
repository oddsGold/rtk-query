import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useRef} from "react";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import {Box, CssBaseline} from "@mui/material";
import FormTitle from "../../components/Generics/FormTitle.jsx";
import Container from "@mui/material/Container";
import {Loading} from "../../components/LoadingBar/Loading.jsx";
import {errorHandler} from "../../components/Utils/errorHandler.js";
import DefaultForm from "../../components/Forms/FaqForm.jsx";
import {useCurrentFaqQuery, useUpdateFaqMutation} from "../../redux/faq/faqApiSlice.js";

const EditFaqPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const previousPath = useRef(location.state?.from?.pathname ?? '/admin/faqs');

    const { data: currentFaq, error, isLoading:  isCurrentFaqLoading } = useCurrentFaqQuery(id);
    const [updateFaq, {isLoading: isUpdateFaqLoading}] = useUpdateFaqMutation();

    if (isCurrentFaqLoading) {
        return <Loading />;
    }

    if (!currentFaq) {
        return <div>Data not found</div>;
    }

    const handleSubmit = async (values) => {
        try {
            await updateFaq({data: values}).unwrap();
            navigate('/admin/faqs');
        } catch (err) {
            errorHandler(err.data.message);
        }
    };


    return (
        <Container  component="main" maxWidth="xl">
            <DocumentTitle>Edit news</DocumentTitle>
            <CssBaseline/>

            <Box sx={{ mt: 2 }}>
                <FormTitle title={"Edit faq"} backLinkPath={previousPath} />
                <DefaultForm
                    current={currentFaq}
                    handleSubmit={handleSubmit}
                />
            </Box>
        </Container>
    )
}

export default EditFaqPage;
