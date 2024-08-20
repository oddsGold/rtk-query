import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {
    Avatar,
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Loading} from "../LoadingBar/Loading.jsx";
import CurrentFile from "../Download/CurrentFile.jsx";
import FileDropzone from "../Generics/FileDropzone.jsx";
import {useImagesQuery, useUploadMutation} from "../../redux/download/downloadApiSlice.js";
import {errorHandler} from "../Utils/errorHandler.js";
import {Link} from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const styles = {
    listItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #cccccc',
    },
    listItemText: {
        marginLeft: '20px',
        flex: 1,
    },
    iconButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
};

export default function DefaultForm({
                                        current = null,
                                        defaultCurrent,
                                        handleSubmit,
                                        enableReinitialize = true,
                                        resources = []
                                    }) {
    const imageAccept = {
        'image/*': ['.jpeg', '.jpg', '.png', '.svg']
    };

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);
    const [sort, setSort] = useState('-id');

    const [uploadFile, {isLoading: isLoadingUploadFile}] = useUploadMutation();
    const [uploadedFileData, setUploadedFileData] = useState(current || null);
    const [fileData, setFileData] = useState(null);
    const [required, setRequired] = useState(false);
    const [isFileMissing, setIsFileMissing] = useState(false);

    const {data: images, error: isImagesError, isLoading: isImagesLoading} = useImagesQuery({page, limit, sort});

    useEffect(() => {
        if (current) {
            setUploadedFileData(current);
        }
    }, [current]);

    useEffect(() => {
        const updatedFileData = uploadedFileData ? (uploadedFileData.data || uploadedFileData.preview) : (current ? current.preview : null);
        setFileData(updatedFileData);
    }, [uploadedFileData]);

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

    const handleImageClick = (image) => {
        setFileData(image);
    };

    return (
        <Formik
            initialValues={current ? current : defaultCurrent}
            enableReinitialize={enableReinitialize}
            validationSchema={Yup.object({
                title: Yup.string()
                    .max(255, 'Максимально допустимо 255 символов')
                    .min(3, 'Минимально 3 символа')
                    .required('Поле обязательно к заполнению'),
                url: Yup.string()
                    .max(255, 'Максимально допустимо 255 символов')
                    .required('Поле обязательно к заполнению'),
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
                    setIsFileMissing(true);
                    errorHandler("Please upload file");
                }
            }}
        >
            {({isSubmitting, handleChange, handleBlur, setFieldValue, values, errors, touched}) => (
                <Form autoComplete="off">
                    <Box sx={{mb: 2}}>
                        <Field
                            as={TextField}
                            fullWidth
                            name="title"
                            label={<>Title *</>}
                            variant="outlined"
                            InputLabelProps={{shrink: true}}
                            error={Boolean(errors.title && touched.title)}
                            helperText={touched.title && errors.title}
                        />
                    </Box>
                    <Box sx={{mb: 2}}>
                        <Field
                            as={TextField}
                            fullWidth
                            name="url"
                            label={<>Url *</>}
                            variant="outlined"
                            InputLabelProps={{shrink: true}}
                            error={Boolean(errors.url && touched.url)}
                            helperText={touched.url && errors.url}
                        />
                    </Box>

                    <Box style={{position: 'relative'}}>
                        {isLoadingUploadFile ? (
                            <Loading/>
                        ) : (
                            <>
                                {fileData ? (
                                    <CurrentFile fileData={fileData} handleClose={handleClose}/>
                                ) : (
                                    <>
                                        <label
                                            style={{
                                                position: 'absolute',
                                                top: '-9px',
                                                left: '12px',
                                                zIndex: 10,
                                                padding: '0 5px',
                                                background: '#141b2d',
                                                fontSize: '11px',
                                                fontWeight: 400,
                                                letterSpacing: '1px',
                                                color: isFileMissing ? 'red' : 'rgba(255, 255, 255, 0.7)'
                                            }}>Preview *</label>
                                        <FileDropzone
                                            accept={imageAccept}
                                            handleSubmit={handleSubmitFile}
                                            required={required}
                                        />
                                        {isFileMissing && (
                                            <Box sx={{mt: 2, color: 'red'}}>
                                                <p>No file selected or file has been removed.</p>
                                            </Box>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </Box>

                    <Button
                        sx={{mt: 2}}
                        type="submit"
                        variant="contained"
                        color="success"
                    >
                        Save
                    </Button>

                    <List sx={{marginTop: '2rem', boxShadow: 10, padding: "10px"}}>
                        <Typography variant="h4" sx={{
                            textTransform: "uppercase",
                            textDecoration: "underline",
                            textUnderlineOffset: "3px",
                            paddingBottom: "10px"
                        }}>Select from previously downloaded:</Typography>
                        {images ? images.map((item) => (
                            <ListItem
                                key={item.id}
                                style={styles.listItem}
                                onClick={() => handleImageClick(item)}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        src={item.url}
                                        alt={item.origin}
                                        style={{width: 100, height: 100, cursor: "pointer"}}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <>
                                            <Typography variant="body2" sx={{fontSize: '14px'}}><b>Оригинальное
                                                имя:</b> {item.origin}</Typography>
                                            <Typography variant="body2"
                                                        sx={{fontSize: '14px', margin: '1rem 0 1rem 0'}}><b>Текущее
                                                имя:</b> {item.name}</Typography>
                                            <Typography variant="body2" sx={{fontSize: '14px'}}><b>Дата
                                                загрузки:</b> {item.created_at}</Typography>
                                        </>
                                    }
                                    style={styles.listItemText}
                                />
                                <Box style={styles.iconButton}>
                                    <Link to={item.url} target="_blank">
                                        <IconButton aria-label="view">
                                            <VisibilityIcon/>
                                        </IconButton>
                                    </Link>
                                </Box>
                            </ListItem>
                        )) : []}
                    </List>

                </Form>
            )}
        </Formik>
    );
}
