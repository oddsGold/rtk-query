import React, { useState } from "react";
import {errorHandler} from "../../components/Utils/errorHandler.js";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import { Box, InputLabel, Select } from "@mui/material";
import CustomFormControl from "../../components/Generics/CustomFormControl.js";
import MenuItem from "@mui/material/MenuItem";
import DefaultTable from "../../components/Tables/DefaultTable.jsx";
import ConfirmDialog from "../../components/Generics/ConfirmDialog.jsx";
import {useDeleteNewsMutation, useNewsQuery} from "../../redux/blog/newsApiSlice.js";
import {Loading} from "../../components/LoadingBar/Loading.jsx";

export default function BlogPage() {
    const gridHeaderRow = [
        { name: 'id', label: '#', sortable: true },
        { name: 'title', label: 'Наименование', sortable: true },
        { name: 'user', label: 'Автор' },
        { name: 'created_at', label: 'Дата создания' },
        { name: 'updated_at', label: 'Дата модификации' }
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
    const [blogToDelete, setBlogToDelete] = useState(null);
    const handleOpenDialog = (role) => {
        setBlogToDelete(role);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setBlogToDelete(null);
    };

    const { data: news, error: isNewsError, isLoading: isNewsLoading } = useNewsQuery({ page, limit, sort });
    const [deleteNews, {isLoading: isDeleteNewsLoading}] = useDeleteNewsMutation();

    const handleDelete = async () => {
        try {
            await deleteNews(blogToDelete.id).unwrap();
            setOpenDialog(false);
            setBlogToDelete(null);
        } catch (err) {
            errorHandler(err.data.message);
            setOpenDialog(false);
            setBlogToDelete(null);
        }
    };

    return (
        isNewsLoading ? (
            <Loading />
        ) : (
        <>
            <DocumentTitle>Blog list</DocumentTitle>
            <DefaultTable
                title="News"
                buttonTitle="Create news"
                setCreatePath="/admin/news/create"
                setEditPath="/admin/news"
                gridHeaderRow={gridHeaderRow}
                data={news}
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
                content="Are you sure you want to delete the news"
                onConfirm={handleDelete}
                onCancel={handleCloseDialog}
                name={blogToDelete ? blogToDelete.title : ''}
            />
        </>)
    );
}
