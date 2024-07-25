import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useRef} from "react";
import {Loading} from "../../../components/LoadingBar/Loading.jsx";
import {errorHandler} from "../../../components/Utils/errorHandler.js";
import DocumentTitle from "../../../components/DocumentTitle.jsx";
import {Box, CssBaseline} from "@mui/material";
import Container from "@mui/material/Container";
import FormTitle from "../../../components/Generics/FormTitle.jsx";
import DefaultForm from "../../../components/Forms/MemoForm.jsx";
import {useCurrentMemoQuery, useUpdateMemoMutation} from "../../../redux/memos/memo/memoApiSlice.js";
import {useTypeQuery} from "../../../redux/memos/type/typeApiSlice.js";

const EditMemoPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const previousPath = useRef(location.state?.from?.pathname ?? '/admin/users/memos');

    const { data: currentMemo, error, isLoading:  isCurrentMemoLoading } = useCurrentMemoQuery(id);
    const [updateMemo, {isLoading: isUpdateMemoLoading}] = useUpdateMemoMutation();
    const {data: types, error: isTypeError, isLoading: isTypeLoading} = useTypeQuery(1,30);

    if (isCurrentMemoLoading) {
        return <Loading />;
    }

    if (!currentMemo) {
        return <div>Data not found</div>;
    }

    const handleSubmit = async (values) => {
        try {
            await updateMemo({data: values}).unwrap();
            navigate('/admin/users/memos');
        } catch (err) {
            errorHandler(err.data.message);
        }
    };

    return (
        <Container  component="main" maxWidth="xl">
            <DocumentTitle>Edit memo</DocumentTitle>
            <CssBaseline/>

            <Box sx={{ mt: 2 }}>
                <FormTitle title={"Edit memo"} backLinkPath={previousPath} />
                <DefaultForm
                    current={currentMemo}
                    handleSubmit={handleSubmit}
                    types={types}
                />
            </Box>
        </Container>
    )
}

export default EditMemoPage;
