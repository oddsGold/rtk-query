import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ConfirmDialog = ({ open, content, onConfirm, onCancel, name }) => {
    return (
        <Dialog open={open} onClose={onCancel}
                PaperProps={{
                    sx: {
                        border: '1px solid #fff',
                        borderRadius: '8px',
                    },
                }}
        >
            <DialogContent>
                <DialogContentText>
                    {content} <strong>{name}</strong>?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onCancel}
                    sx={{
                        color: 'white',
                        backgroundColor: 'red',
                        '&:hover': {
                            backgroundColor: 'darkred',
                        },
                    }}
                >
                    Нет
                </Button>
                <Button onClick={onConfirm}
                        sx={{
                            color: 'white',
                            backgroundColor: 'green',
                            '&:hover': {
                                backgroundColor: 'darkgreen',
                            },
                        }}
                        autoFocus>
                    Да
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
