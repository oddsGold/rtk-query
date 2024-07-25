import React, {useState} from "react";
import {errorHandler} from "../../components/Utils/errorHandler.js";
import {Loading} from "../../components/LoadingBar/Loading.jsx";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import {Box, InputLabel, Select} from "@mui/material";
import CustomFormControl from "../../components/Generics/CustomFormControl.js";
import MenuItem from "@mui/material/MenuItem";
import ConfirmDialog from "../../components/Generics/ConfirmDialog.jsx";
import {useDeleteFaqMutation, useFaqQuery} from "../../redux/faq/faqApiSlice.js";
import DefaultTable from "../../components/Tables/DefaultTable.jsx";

export default function FaqPage () {
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
    const [faqToDelete, setFaqToDelete] = useState(null);

    const handleOpenDialog = (role) => {
        setFaqToDelete(role);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setFaqToDelete(null);
    };

    const { data: faqs, error: isFaqError, isLoading: isFaqLoading } = useFaqQuery({ page, limit, sort });
    const [deleteFaq, {isLoading: isDeleteFaqLoading}] = useDeleteFaqMutation();

    const handleDelete = async () => {
        try {
            await deleteFaq(faqToDelete.id).unwrap();
            setOpenDialog(false);
            setFaqToDelete(null);
        } catch (err) {
            errorHandler(err.data.message);
            setOpenDialog(false);
            setFaqToDelete(null);
        }
    };

    return (
        isFaqLoading ? (
            <Loading />
        ) : (
            <>
                <DocumentTitle>Faq list</DocumentTitle>
                <DefaultTable
                    title="FAQ"
                    buttonTitle="Create faq"
                    setCreatePath="/admin/faqs/create"
                    setEditPath="/admin/faqs"
                    gridHeaderRow={gridHeaderRow}
                    data={faqs}handleDelete={handleOpenDialog}

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
                    content="Are you sure you want to delete the faq"
                    onConfirm={handleDelete}
                    onCancel={handleCloseDialog}
                    name={faqToDelete ? faqToDelete.title : ''}
                />
            </>
        )
    )
}
