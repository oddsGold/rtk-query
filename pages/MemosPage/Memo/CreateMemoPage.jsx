import {useLocation, useNavigate} from "react-router-dom";
import React, {useRef, useState} from "react";
import {errorHandler} from "../../../components/Utils/errorHandler.js";
import {useCreateMemoMutation} from "../../../redux/memos/memo/memoApiSlice.js";
import {useTypeQuery} from "../../../redux/memos/type/typeApiSlice.js";
import Container from "@mui/material/Container";
import DocumentTitle from "../../../components/DocumentTitle.jsx";
import {Box, CssBaseline} from "@mui/material";
import FormTitle from "../../../components/Generics/FormTitle.jsx";
import DefaultForm from "../../../components/Forms/MemoForm.jsx";

const CreateMemoPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const previousPath = useRef(location.state?.from?.pathname ?? '/admin/users/memos');

    const [createMemo, {isLoading}] = useCreateMemoMutation();
    const {data: types, error: isTypeError, isLoading: isTypeLoading} = useTypeQuery(1,30);

    const handleSubmit = async (values) => {
        try {
            await createMemo({data: values}).unwrap();
            navigate('/admin/users/memos');
        } catch (err) {
            errorHandler(err.data.message);
        }
    };
    return (
        <Container  component="main" maxWidth="xl">
            <DocumentTitle>Create new type</DocumentTitle>
            <CssBaseline/>

            <Box sx={{ mt: 2 }}>
                <FormTitle title={"Create new memo"} backLinkPath={previousPath} />
                <DefaultForm
                    defaultCurrent={{
                        type: ''
                    }}
                    types={types}
                    handleSubmit={handleSubmit}
                />
            </Box>
        </Container>
    )
}

export default CreateMemoPage;
