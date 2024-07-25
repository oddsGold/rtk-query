import React, {useState} from "react";
import {errorHandler} from "../../../components/Utils/errorHandler.js";
import {Loading} from "../../../components/LoadingBar/Loading.jsx";
import DocumentTitle from "../../../components/DocumentTitle.jsx";
import DefaultTable from "../../../components/Tables/DefaultTable.jsx";
import {Box, InputLabel, Select} from "@mui/material";
import CustomFormControl from "../../../components/Generics/CustomFormControl.js";
import MenuItem from "@mui/material/MenuItem";
import ConfirmDialog from "../../../components/Generics/ConfirmDialog.jsx";
import {useDeleteMemoMutation, useMemoQuery} from "../../../redux/memos/memo/memoApiSlice.js";

export default function MemoPage() {
    const gridHeaderRow = [
        {name: 'id', label: '#', sortable: true},
        {name: 'type', label: 'Тип'},
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
    const [memoToDelete, setMemoToDelete] = useState(null);

    const handleOpenDialog = (role) => {
        setMemoToDelete(role);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setMemoToDelete(null);
    };

    const {data: memos, error: isMemoError, isLoading: isMemoLoading} = useMemoQuery({page, limit, sort});
    const [deleteMemo, {isLoading: isDeleteMemoLoading}] = useDeleteMemoMutation();

    const handleDelete = async () => {
        try {
            await deleteMemo(memoToDelete.id).unwrap();
            setOpenDialog(false);
            setMemoToDelete(null);
        } catch (err) {
            errorHandler(err.data.message);
            setOpenDialog(false);
            setMemoToDelete(null);
        }
    };

    return(
        isMemoLoading ? (
            <Loading/>
        ) : (
            <>
                <DocumentTitle>Memo list</DocumentTitle>
                <DefaultTable
                    title="Памятки"
                    buttonTitle="Create memo"
                    setCreatePath="/admin/users/memos/create"
                    setEditPath="/admin/users/memos"
                    gridHeaderRow={gridHeaderRow}
                    data={memos}
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
                    content="Are you sure you want to delete the memo"
                    onConfirm={handleDelete}
                    onCancel={handleCloseDialog}
                    name={memoToDelete ? memoToDelete.id : ''}
                />
            </>
        )
    )
}
