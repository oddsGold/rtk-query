import React, {useState} from 'react';
import FileDropzone from "../../components/Generics/FileDropzone.jsx";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import {Box, InputLabel, Select} from "@mui/material";
import CustomFormControl from "../../components/Generics/CustomFormControl.js";
import MenuItem from "@mui/material/MenuItem";
import ConfirmDialog from "../../components/Generics/ConfirmDialog.jsx";
import {useDeleteImageMutation, useImagesQuery, useUploadMutation} from "../../redux/download/downloadApiSlice.js";
import {Loading} from "../../components/LoadingBar/Loading.jsx";
import Typography from "@mui/material/Typography";
import {acceptHandler, errorHandler} from "../../components/Utils/errorHandler.js";
import FileList from "../../components/Download/FileList.jsx";

export default function ImagePage() {
    const imageAccept = {
        'image/*': ['.jpeg', '.jpg', '.png', '.svg']
    };

    const [size, setSize] = useState(30);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);
    const [sort, setSort] = useState('-id');


    const handleChange = (event) => {
        setLimit(event.target.value);
        setSize(event.target.value);
        setPage(1);
    };

    const [openDialog, setOpenDialog] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);

    const handleOpenDialog = (role) => {
        setImageToDelete(role);
        setOpenDialog(true);
    };


    const handleCloseDialog = () => {
        setOpenDialog(false);
        setImageToDelete(null);
    };

    const {data: images, error: isImagesError, isLoading: isImagesLoading} = useImagesQuery({page, limit, sort});
    const [uploadImage, {isLoading}] = useUploadMutation();
    const [deleteImage, {isLoading: isDeleteImageLoading}] = useDeleteImageMutation();

    if (!images) {
        return <div>Data not found</div>;
    }
    const handleSubmit = async (file) => {
        try {
            await uploadImage(file).unwrap();
            acceptHandler();
        } catch (err) {
            errorHandler(err.data.message);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteImage(imageToDelete.id).unwrap();
            setOpenDialog(false);
            setImageToDelete(null);
        } catch (err) {
            errorHandler(err.data.message);
            setOpenDialog(false);
            setImageToDelete(null);
        }
    };

    return (
        isImagesLoading ? (
            <Loading/>
        ) : (
            <>
                <DocumentTitle>Download images</DocumentTitle>
                <Typography variant="h2" component="h2" sx={{marginBottom: '1rem'}}>
                    Download images
                </Typography>
                <FileDropzone
                    accept={imageAccept}
                    handleSubmit={handleSubmit}
                />
                <FileList
                    data={images}
                    handleDelete={handleOpenDialog}
                />
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                    }}
                >
                    <CustomFormControl size="small">
                        <InputLabel id="demo-select-small-label">Pagination</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={size}
                            label="Pagination"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={999999}>all</MenuItem>
                        </Select>
                    </CustomFormControl>
                </Box>
                <ConfirmDialog
                    open={openDialog}
                    content="Are you sure you want to delete this image"
                    onConfirm={handleDelete}
                    onCancel={handleCloseDialog}
                    name={imageToDelete ? imageToDelete.origin : ''}
                />
            </>)
    )
}
