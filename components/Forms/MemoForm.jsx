import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import RequiredStar from "../Generics/RequiredStar.js";
import React, { useEffect, useState } from "react";
import FileDropzone from "../Generics/FileDropzone.jsx";
import { errorHandler } from "../Utils/errorHandler.js";
import { useUploadFileMutation } from "../../redux/download/downloadApiSlice.js";
import CurrentFile from "../Download/CurrentFile.jsx";
import { Loading } from "../LoadingBar/Loading.jsx";
export default function DefaultForm({
                                        current = null,
                                        defaultCurrent,
                                        handleSubmit,
                                        enableReinitialize = true,
                                        types = []
                                    }) {
    const fileAccept = {
        'application/pdf': ['.pdf'],
        'application/msword': ['.doc', '.docx'],
        'application/vnd.ms-excel': ['.xls', '.xlsx'],
        'text/plain': ['.txt'],
    };

    const [uploadFile, { isLoading: isLoadingUploadFile }] = useUploadFileMutation();
    const [uploadedFileData, setUploadedFileData] = useState(null);
    const [fileData, setFileData] = useState(null);
    const [required, setRequired] = useState(false);

    useEffect(() => {
        setUploadedFileData(current);
    }, [current]);

    useEffect(() => {
        const updatedFileData = uploadedFileData ? (uploadedFileData.data || uploadedFileData.file) : (current ? current.file : null);
        setFileData(updatedFileData);
    }, [uploadedFileData]);

    const isFileMissing = uploadedFileData && !uploadedFileData.data && !uploadedFileData.file;

    const handleSubmitFile = async (formData) => {
        try {
            const result = await uploadFile(formData).unwrap();
            setUploadedFileData(result);
            setRequired(false);
        } catch (err) {
            errorHandler(err.data.message);
        }
    };

    const handleClose = () => {
        setFileData(null);
    };

    return (
        <Formik
            initialValues={current ? current : defaultCurrent}
            enableReinitialize={enableReinitialize}
            validationSchema={Yup.object({
                type: Yup.mixed().required('Field is required'),
            })}
            onSubmit={(values) => {
                if (fileData) {
                    const dataToSubmit = {
                        ...values,
                        file: fileData,
                        user: fileData.user
                    };
                    handleSubmit(dataToSubmit);
                } else {
                    setRequired(true);
                    errorHandler("Please upload file");
                }
            }}
        >
            {({ isSubmitting, handleChange, handleBlur, setFieldValue, values, errors, touched }) => (
                <Form autoComplete="off">
                    <Box sx={{ mb: 2 }}>
                        <FormControl fullWidth variant="outlined" error={touched.type && Boolean(errors.type)}>
                            <InputLabel shrink={true}>
                                Type <RequiredStar>*</RequiredStar>
                            </InputLabel>
                            <Field
                                as={Select}
                                name="type"
                                label="Type"
                                notched
                                labelId="type-label"
                                inputProps={{ 'aria-label': 'type' }}
                                value={values.type || ''}
                            >
                                {types ? types.map((type) => (
                                    <MenuItem key={type.id} value={type.id}>
                                        {type.title}
                                    </MenuItem>
                                )) : []}
                            </Field>
                            {touched.type && Boolean(errors.type) && (
                                <FormHelperText>{errors.type}</FormHelperText>
                            )}
                        </FormControl>
                    </Box>

                    {isLoadingUploadFile ? (
                        <Loading />
                    ) : (
                        <>
                            {fileData ? (
                                <CurrentFile fileData={fileData} handleClose={handleClose} />
                            ) : (
                                <>
                                    <FileDropzone
                                        accept={fileAccept}
                                        handleSubmit={handleSubmitFile}
                                        required={required}
                                    />
                                    {isFileMissing && (
                                        <Box sx={{ mt: 2, color: 'red' }}>
                                            <p>No file selected or file has been removed.</p>
                                        </Box>
                                    )}
                                </>
                            )}
                        </>
                    )}

                    <Box sx={{ mt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                        >
                            Save
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}
