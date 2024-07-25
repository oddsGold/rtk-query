import React, {useState} from "react";
import {errorHandler} from "../../components/Utils/errorHandler.js";
import {Loading} from "../../components/LoadingBar/Loading.jsx";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import DefaultTable from "../../components/Tables/DefaultTable.jsx";
import {Box, InputLabel, Select} from "@mui/material";
import CustomFormControl from "../../components/Generics/CustomFormControl.js";
import MenuItem from "@mui/material/MenuItem";
import ConfirmDialog from "../../components/Generics/ConfirmDialog.jsx";
import {useDeleteVideoMutation, useVideoQuery} from "../../redux/video/videoApiSlice.js";

export default function VideoPage() {
    const gridHeaderRow = [
        {name: 'id', label: '#', sortable: true},
        {name: 'title', label: 'Наименование', sortable: true},
        {name: 'user', label: 'Автор'},
        {name: 'created_at', label: 'Дата создания'},
        {name: 'updated_at', label: 'Дата модификации'}
    ];

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
    const [videoToDelete, setVideoToDelete] = useState(null);

    const handleOpenDialog = (role) => {
        setVideoToDelete(role);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setVideoToDelete(null);
    };

    const {data: videos, error: isVideoError, isLoading: isVideoLoading} = useVideoQuery({page, limit, sort});
    const [deleteVideo, {isLoading: isDeleteVideoLoading}] = useDeleteVideoMutation();

    const handleDelete = async () => {
        try {
            await deleteVideo(videoToDelete.id).unwrap();
            setOpenDialog(false);
            setVideoToDelete(null);
        } catch (err) {
            errorHandler(err.data.message);
            setOpenDialog(false);
            setVideoToDelete(null);
        }
    };

    return(
        isVideoLoading ? (
            <Loading/>
        ) : (
            <>
                <DocumentTitle>Video list</DocumentTitle>
                <DefaultTable
                    title="Video"
                    buttonTitle="Create video"
                    setCreatePath="/admin/videos/create"
                    setEditPath="/admin/videos"
                    gridHeaderRow={gridHeaderRow}
                    data={videos}
                    handleDelete={handleOpenDialog}
                    sort={sort}
                    setSort={setSort}
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
                    content="Are you sure you want to delete the video"
                    onConfirm={handleDelete}
                    onCancel={handleCloseDialog}
                    name={videoToDelete ? videoToDelete.title : ''}
                />
            </>
        )
    )
}
