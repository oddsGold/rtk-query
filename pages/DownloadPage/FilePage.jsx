import React, {useState} from 'react';
import FileDropzone from "../../components/Generics/FileDropzone.jsx";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import {Box, InputLabel, Select} from "@mui/material";
import CustomFormControl from "../../components/Generics/CustomFormControl.js";
import MenuItem from "@mui/material/MenuItem";
import ConfirmDialog from "../../components/Generics/ConfirmDialog.jsx";
import {
    useDeleteFileMutation,
    useFilesQuery,
    useUploadFileMutation,
    useUploadMutation
} from "../../redux/download/downloadApiSlice.js";
import {Loading} from "../../components/LoadingBar/Loading.jsx";
import Typography from "@mui/material/Typography";
import {acceptHandler, errorHandler} from "../../components/Utils/errorHandler.js";
import FileList from "../../components/Download/FileList.jsx";

export default function FilePage() {
    const fileAccept = {
        'application/pdf': ['.pdf'],
        'application/msword': ['.doc', '.docx'],
        'application/vnd.ms-excel': ['.xls', '.xlsx'],
        'text/plain': ['.txt'],
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
    const [fileToDelete, setFileToDelete] = useState(null);

    const handleOpenDialog = (role) => {
        setFileToDelete(role);
        setOpenDialog(true);
    };


    const handleCloseDialog = () => {
        setOpenDialog(false);
        setFileToDelete(null);
    };

    const {data: files, error: isFilesError, isLoading: isFilesLoading} = useFilesQuery({page, limit, sort});
    const [uploadFile, {isLoading}] = useUploadFileMutation();
    const [deleteFile, {isLoading: isDeleteFileLoading}] = useDeleteFileMutation();
    const handleSubmit = async (file) => {
        try {
            await uploadFile(file).unwrap();
            acceptHandler();
        } catch (err) {
            errorHandler(err.data.message);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteFile(fileToDelete.id).unwrap();
            setOpenDialog(false);
            setFileToDelete(null);
        } catch (err) {
            errorHandler(err.data.message);
            setOpenDialog(false);
            setFileToDelete(null);
        }
    };

    return (
        isFilesLoading ? (
            <Loading/>
        ) : (
            <>
                <DocumentTitle>Download file</DocumentTitle>
                <Typography variant="h2" component="h2" sx={{marginBottom: '1rem'}}>
                    Download files
                </Typography>
                <FileDropzone
                    accept={fileAccept}
                    handleSubmit={handleSubmit}
                />
                <FileList
                    data={files}
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
                    name={fileToDelete ? fileToDelete.origin : ''}
                />
            </>)
    )
}
