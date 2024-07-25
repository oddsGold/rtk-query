import React, {useState} from "react";
import {errorHandler} from "../../../components/Utils/errorHandler.js";
import {Loading} from "../../../components/LoadingBar/Loading.jsx";
import DocumentTitle from "../../../components/DocumentTitle.jsx";
import {Box, InputLabel, Select} from "@mui/material";
import CustomFormControl from "../../../components/Generics/CustomFormControl.js";
import MenuItem from "@mui/material/MenuItem";
import ConfirmDialog from "../../../components/Generics/ConfirmDialog.jsx";
import DefaultTable from "../../../components/Tables/DefaultTable.jsx";
import {useDeleteTypeMutation, useTypeQuery} from "../../../redux/memos/type/typeApiSlice.js";

export default function TypePage() {
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
    const [typeToDelete, setTypeToDelete] = useState(null);

    const handleOpenDialog = (role) => {
        setTypeToDelete(role);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setTypeToDelete(null);
    };

    const {data: types, error: isTypeError, isLoading: isTypeLoading} = useTypeQuery({page, limit, sort});
    const [deleteType, {isLoading: isDeleteTypeLoading}] = useDeleteTypeMutation();

    const handleDelete = async () => {
        try {
            await deleteType(typeToDelete.id).unwrap();
            setOpenDialog(false);
            setTypeToDelete(null);
        } catch (err) {
            errorHandler(err.data.message);
            setOpenDialog(false);
            setTypeToDelete(null);
        }
    };

    return (
        isTypeLoading ? (
            <Loading/>
        ) : (
            <>
                <DocumentTitle>Type list</DocumentTitle>
                <DefaultTable
                    title="Типы памятки"
                    buttonTitle="Create an entry"
                    setCreatePath="/admin/users/memos/types/create"
                    setEditPath="/admin/users/memos/types"
                    gridHeaderRow={gridHeaderRow}
                    data={types}
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
                    content="Are you sure you want to delete the type"
                    onConfirm={handleDelete}
                    onCancel={handleCloseDialog}
                    name={typeToDelete ? typeToDelete.title : ''}
                />
            </>
        )
    )
}
