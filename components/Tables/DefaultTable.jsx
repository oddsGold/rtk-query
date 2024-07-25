import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, Grid, Box, Tooltip, IconButton
} from '@mui/material';
import {NavLink, useLocation} from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const DefaultTable = ({ title, buttonTitle, gridHeaderRow, data, setCreatePath, setEditPath, handleDelete, sort = '', setSort = () => {} }) => {
    const location = useLocation();

    const handleSort = (column) => {
        if (setSort) {
            const isAsc = sort === column;
            setSort(isAsc ? `-${column}` : column);
        }
    };

    const getSortIcon = (column) => {
        if (sort && sort.includes(column)) {
            return sort.startsWith('-') ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1, maxHeight: '18px', marginTop: '-10px' }}>
                    <ArrowDropUpIcon fontSize="small" sx={{ color: '#e9870c' }} />
                    <ArrowDropDownIcon fontSize="small" sx={{ opacity: 0.3, marginTop: '-4px', color: '#6e6060' }} />
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1, maxHeight: '18px', marginTop: '-10px'  }}>
                    <ArrowDropUpIcon fontSize="small" sx={{ opacity: 0.3, marginBottom: '-4px', color: '#6E6060FF' }} />
                    <ArrowDropDownIcon fontSize="small" sx={{ color: '#e9870c' }} />
                </Box>
            );
        }
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1, maxHeight: '18px', marginTop: '-10px'  }}>
                <ArrowDropUpIcon fontSize="small" sx={{ opacity: 0.3, marginBottom: '-4px', color: '#6E6060FF' }} />
                <ArrowDropDownIcon fontSize="small" sx={{ opacity: 0.3, color: '#6E6060FF' }} />
            </Box>
        );
    };

    return (
        <>
            <Grid container alignItems="center" justifyContent="flex-start" paddingBottom={2}>
                <Typography variant="h2" component="h2">
                    {title}
                </Typography>

                <NavLink to={`${setCreatePath}`} state={{ from: location }}>
                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: 'green',
                            marginLeft: '16px',
                            borderRadius: '6px',
                            padding: '2px 15px'
                        }}
                    >
                        {buttonTitle}
                    </Button>
                </NavLink>
            </Grid>
            <TableContainer component={Paper} sx={{ maxHeight: '75vh' }}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {gridHeaderRow.map((header, index) => (
                                <TableCell
                                    key={index}
                                    sx={{ fontWeight: 'bold', fontSize: '14px', cursor: header.sortable ? 'pointer' : 'default' }}
                                    onClick={() => header.sortable && handleSort(header.name)}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        {header.label}
                                        {header.sortable && (
                                            <Tooltip title="Sort" arrow>
                                                <IconButton
                                                    size="small"
                                                    sx={{ marginLeft: '4px', p: '2px', color: 'rgba(0, 0, 0, 0.54)' }}
                                                >
                                                    {getSortIcon(header.name)}
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </Box>
                                </TableCell>
                            ))}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data ? data.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {gridHeaderRow.map((header, cellIndex) => (
                                    <TableCell key={cellIndex}>
                                        {header.name.split('.').reduce((acc, key) => acc && acc[key], row)}
                                    </TableCell>
                                ))}
                                <TableCell align="center">
                                    <NavLink to={`${setEditPath}/${row.id}/edit`} state={{ from: location }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ bgcolor: '#0d6efd' }}
                                        >
                                            Edit
                                        </Button>
                                    </NavLink>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            marginLeft: '16px',
                                            bgcolor: 'rgba(181, 8, 2, 0.85)',
                                        }}
                                        onClick={() => handleDelete(row)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : []}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default DefaultTable;
