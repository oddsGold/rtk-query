import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Typography, Box } from "@mui/material";
import { Visibility as VisibilityIcon, Close as CloseIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const styles = {
    listItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    listItemText: {
        flex: 1,
        marginLeft: '1rem',
    },
    iconButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
};

const CurrentFile = ({ fileData, handleClose }) => (
    <List>
        <ListItem key={fileData.id} style={styles.listItem}>
            <ListItemAvatar>
                <Avatar
                    variant="rounded"
                    src={fileData.url}
                    alt={fileData.origin}
                    style={{ width: 160, height: 160 }}
                />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <>
                        <Typography variant="body2" sx={{ fontSize: '14px' }}><b>Оригинальное имя:</b> {fileData.origin}</Typography>
                        <Typography variant="body2" sx={{ fontSize: '14px', margin: '1rem 0 1rem 0' }}><b>Текущее имя:</b> {fileData.name}</Typography>
                        <Typography variant="body2" sx={{ fontSize: '14px' }}><b>Дата загрузки:</b> {fileData.created_at}</Typography>
                    </>
                }
                style={styles.listItemText}
            />
            <Box style={styles.iconButton}>
                <IconButton aria-label="delete" onClick={() => handleClose(fileData)}>
                    <CloseIcon />
                </IconButton>
                <Link to={fileData.url} target="_blank">
                    <IconButton aria-label="view">
                        <VisibilityIcon />
                    </IconButton>
                </Link>
            </Box>
        </ListItem>
    </List>
);

export default CurrentFile;
