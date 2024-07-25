import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Loading } from "../LoadingBar/Loading.jsx";
import CurrentFile from "../Download/CurrentFile.jsx";
import FileDropzone from "../Generics/FileDropzone.jsx";
import { useUploadMutation } from "../../redux/download/downloadApiSlice.js";
import { errorHandler } from "../Utils/errorHandler.js";

export default function DefaultForm({ current = null, defaultCurrent, handleSubmit, enableReinitialize = true, resources = [] }) {
    const imageAccept = {
        'image/*': ['.jpeg', '.jpg', '.png', '.svg']
    };

    const [uploadFile, { isLoading: isLoadingUploadFile }] = useUploadMutation();
    const [uploadedFileData, setUploadedFileData] = useState(current || null);
    const [fileData, setFileData] = useState(null);
    const [required, setRequired] = useState(false);

    useEffect(() => {
        if (current) {
            setUploadedFileData(current);
        }
    }, [current]);


    useEffect(() => {
        const updatedFileData = uploadedFileData ? (uploadedFileData.data || uploadedFileData.preview) : (current ? current.preview : null);
        setFileData(updatedFileData);
    }, [uploadedFileData]);

    const isFileMissing = uploadedFileData && !uploadedFileData.data && !uploadedFileData.preview;
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
                title: Yup.string()
                    .max(255, 'Максимально допустиммо 255 символов')
                    .min(3, 'Минимально 3 символа')
                    .required('Поле обезательное к заполнение'),
                url: Yup.string()
                    .max(255, 'Максимально допустиммо 255 символов')
                    .required('Поле обезательное к заполнение'),
            })}
            onSubmit={(values) => {
                if (fileData) {
                    const dataToSubmit = {
                        ...values,
                        preview: fileData,
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
                        <Field
                            as={TextField}
                            fullWidth
                            name="title"
                            label={<>Title *</>}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(errors.title && touched.title)}
                            helperText={touched.title && errors.title}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Field
                            as={TextField}
                            fullWidth
                            name="url"
                            label={<>Url *</>}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(errors.url && touched.url)}
                            helperText={touched.url && errors.url}
                        />
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
                                        accept={imageAccept}
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

                    <Button
                        sx={{ mt: 2 }}
                        type="submit"
                        variant="contained"
                        color="success"
                    >
                        Save
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
