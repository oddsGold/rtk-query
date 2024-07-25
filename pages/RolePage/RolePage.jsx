import React, {useState} from "react";
import {Loading} from "../../components/LoadingBar/Loading.jsx";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import {Box, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import ConfirmDialog from "../../components/Generics/ConfirmDialog.jsx";
import DefaultTable from "../../components/Tables/DefaultTable.jsx";
import CustomFormControl from "../../components/Generics/CustomFormControl.js";
import {useDeleteRoleMutation, useRolesQuery} from "../../redux/users/usersApiSlice.js";
import {errorHandler} from "../../components/Utils/errorHandler.js";

export default function RolePage() {
    const gridHeaderRow = [
        { name: 'id', label: '#' },
        { name: 'label', label: 'Наименование' },
        { name: 'created_at', label: 'Дата создания' },
        { name: 'updated_at', label: 'Дата модификации' }
    ];

    const [size, setSize] = useState(30);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);
    const handleChange = (event) => {
        setLimit(event.target.value);
        setSize(event.target.value);
        setPage(1);
    };

    const [openDialog, setOpenDialog] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState(null);
    const handleOpenDialog = (role) => {
        setRoleToDelete(role);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setRoleToDelete(null);
    };

    const { data: roles, error: isRolesError, isLoading: isRolesLoading } = useRolesQuery({ page, limit });
    const [deleteRole, {isLoading: isDeleteRoleLoading}] = useDeleteRoleMutation();
    const handleDelete = async () => {
        try {
            await deleteRole(roleToDelete.id).unwrap();
            setOpenDialog(false);
            setRoleToDelete(null);
        } catch (err) {
            errorHandler(err.data.message);
            setOpenDialog(false);
            setRoleToDelete(null);
        }
    };

    return (
        isRolesLoading ? (
            <Loading />
        ) : (
            <>
                <DocumentTitle>Roles list</DocumentTitle>
                <DefaultTable
                    title="Роли"
                    buttonTitle="Create role"
                    setCreatePath="/admin/roles/create"
                    setEditPath="/admin/roles"
                    gridHeaderRow={gridHeaderRow}
                    data={roles}
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
                    content="Are you sure you want to delete the role"
                    onConfirm={handleDelete}
                    onCancel={handleCloseDialog}
                    name={roleToDelete ? roleToDelete.label : ''}
                />
            </>
        )
    )
}
