import {useLocation, useNavigate} from "react-router-dom";
import React, {useRef} from "react";
import {errorHandler} from "../../components/Utils/errorHandler.js";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import {Box, CssBaseline} from "@mui/material";
import Container from "@mui/material/Container";
import FormTitle from "../../components/Generics/FormTitle.jsx";
import DefaultForm from "../../components/Forms/FaqForm.jsx";
import {useCreateFaqMutation} from "../../redux/faq/faqApiSlice.js";

const CreateFaqPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const previousPath = useRef(location.state?.from?.pathname ?? '/admin/faqs');

    const [createFaq, {isLoading}] = useCreateFaqMutation();

    const handleSubmit = async (values) => {
        try {
            await createFaq({data: values}).unwrap();
            navigate('/admin/faqs');
        } catch (err) {
            errorHandler(err.data.message);
        }
    };

    return(
        <Container  component="main" maxWidth="xl">
            <DocumentTitle>Create new news</DocumentTitle>
            <CssBaseline/>

            <Box sx={{ mt: 2 }}>
                <FormTitle title={"Create new faq"} backLinkPath={previousPath} />
                <DefaultForm
                    defaultCurrent={{
                        title: '',
                        description: '',
                        published: false,
                        published_at: '',
                        published_to: ''
                    }}
                    handleSubmit={handleSubmit}
                />
            </Box>
        </Container>
    )
}

export default CreateFaqPage;
