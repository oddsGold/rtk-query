import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Link} from "react-router-dom";

const styles = {
    listItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #cccccc',
    },
    listItemText: {
        marginLeft: '20px',
        flex: 1,
    },
    iconButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
};

export default function ImageList({ data, handleDelete }) {
    return (
        <List>
            {data ? data.map((item) => (
                <ListItem key={item.id} style={styles.listItem}>
                    <ListItemAvatar>
                        <Avatar
                            variant="rounded"
                            src={item.url}
                            alt={item.origin}
                            style={{ width: 160, height: 160 }}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <>
                                <Typography variant="body2" sx={{fontSize: '14px'}}><b>Оригинальное имя:</b> {item.origin}</Typography>
                                <Typography variant="body2" sx={{fontSize: '14px', margin: '1rem 0 1rem 0'}}><b>Текущее имя:</b> {item.name}</Typography>
                                <Typography variant="body2" sx={{fontSize: '14px'}}><b>Дата загрузки:</b> {item.created_at}</Typography>
                            </>
                        }
                        style={styles.listItemText}
                    />
                    <Box style={styles.iconButton}>
                        <Link to={item.url} target="_blank">
                            <IconButton aria-label="view">
                                <VisibilityIcon />
                            </IconButton>
                        </Link>
                        <IconButton aria-label="delete"  onClick={() => handleDelete(item)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </ListItem>
            )): []}
        </List>
    );
}
