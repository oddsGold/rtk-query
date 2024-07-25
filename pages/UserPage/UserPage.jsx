import DefaultTable from "../../components/Tables/DefaultTable.jsx";
import {useDeleteUserMutation, useUsersQuery} from "../../redux/users/usersApiSlice.js";
import {Loading} from "../../components/LoadingBar/Loading.jsx";
import React, {useState} from "react";
import {Box, FormControl, InputLabel, Select, styled} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import DocumentTitle from "../../components/DocumentTitle.jsx";
import {errorHandler} from "../../components/Utils/errorHandler.js";
import ConfirmDialog from "../../components/Generics/ConfirmDialog.jsx";
import CustomFormControl from "../../components/Generics/CustomFormControl.js";

export default function UserPage() {
    const gridHeaderRow = [
        { name: 'id', label: '#' },
        { name: 'login', label: 'Наименование' },
        { name: 'last_login_at', label: 'Дата Последнего входа' },
        { name: 'created_at', label: 'Дата создания' },
        { name: 'updated_at', label: 'Дата модификации' }
    ];

    const [size, setSize] = React.useState(30);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);

    const [openDialog, setOpenDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const { data: users, error, isLoading: isUsersLoading } = useUsersQuery({ page, limit });
    const [deleteUser, {isLoading: isDeleteUserLoading}] = useDeleteUserMutation();

    const isLoading = isUsersLoading || isDeleteUserLoading;

    const handleDelete = async () => {
        try {
            await deleteUser(userToDelete.id).unwrap();
            setOpenDialog(false);
            setUserToDelete(null);
        } catch (err) {
            errorHandler(err.data.message);
            setOpenDialog(false);
            setUserToDelete(null);
        }
    };

    const handleOpenDialog = (user) => {
        setUserToDelete(user);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setUserToDelete(null);
    };

    const handleChange = (event) => {
        setLimit(event.target.value);
        setSize(event.target.value);
        setPage(1);
    };

    return (
        isLoading ? (
            <Loading />
        ) : (
            <>
                <DocumentTitle>Users list</DocumentTitle>
                <DefaultTable
                    title="Пользователи"
                    buttonTitle="Create user"
                    setCreatePath="/admin/users/create"
                    setEditPath="/admin/users"
                    gridHeaderRow={gridHeaderRow}
                    data={users.users}
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
                    content="Are you sure you want to delete the user"
                    onConfirm={handleDelete}
                    onCancel={handleCloseDialog}
                    username={userToDelete ? userToDelete.login : ''}
                />
            </>
        )
    )
}
