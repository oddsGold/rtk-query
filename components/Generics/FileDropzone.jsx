import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box } from "@mui/material";

const getDropzoneStyles = (required) => ({
    border: `2px dashed ${required ? 'red' : '#cccccc'}`,
    borderRadius: '4px',
    padding: '40px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '20px',
    color: required ? 'red' : 'inherit',
});

export default function FileDropzone({ accept, handleSubmit, required = false }) {
    const [file, setFile] = useState(null);
    const [errorMessages, setErrorMessages] = useState([]);
    const [styles, setStyles] = useState(getDropzoneStyles(required));

    useEffect(() => {
        setStyles(getDropzoneStyles(required));
    }, [required]);

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
            const selectedFile = acceptedFiles[0];
            setFile(selectedFile);
            setErrorMessages([]);

            const formData = new FormData();
            formData.append('data', selectedFile);
            handleSubmit(formData);
        }
        setErrorMessages([]);
    }, [handleSubmit]);

    const onDropRejected = useCallback(rejectedFiles => {
        const newErrors = rejectedFiles.map(file => `${file.file.name} is not a valid format.`);
        setErrorMessages(prevErrors => [...prevErrors, ...newErrors]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        onDropRejected,
        accept: accept,
        multiple: false,
        validator: file => {
            const fileExtension = file.name.split('.').pop();
            const acceptedExtensions = Object.values(accept).flat().map(ext => ext.replace('.', ''));

            if (!acceptedExtensions.includes(fileExtension)) {
                return {
                    code: "file-invalid-type",
                    message: `${file.name} is not a valid format.`
                };
            }

            return null;
        }
    });

    const description = Object.values(accept)
        .flat()
        .map(ext => ext.replace('.', '').toUpperCase())
        .join(', ');

    return (
        <div>
            <div {...getRootProps()} style={styles}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the file here ...</p> :
                        <p>Drag 'n' drop a file here, or click to select a file ({description})</p>
                }
            </div>
            {errorMessages.length > 0 && (
                <Box sx={{ marginTop: '1rem', fontSize: '16px' }}>
                    <div>
                        <ul>
                            {errorMessages.map((error, index) => (
                                <li key={index} style={{ color: 'red' }}>{error}</li>
                            ))}
                        </ul>
                    </div>
                </Box>
            )}
        </div>
    );
}
