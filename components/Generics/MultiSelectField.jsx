import React from 'react';
import {
    Box,
    TextField,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    FormControl,
    InputLabel,
    FormHelperText
} from '@mui/material';
import { Field } from 'formik';
import RequiredStar from './RequiredStar';

const MultiSelectField = ({ name, label, resources, values, errors, touched, handleChange, handleBlur }) => {
    return (
        <FormControl
            fullWidth
            variant="outlined"
            error={touched.resources && Boolean(errors.resources)}
        >
            <InputLabel shrink={true}>
                Resources <RequiredStar>*</RequiredStar>
            </InputLabel>
            <Field
                as={Select}
                multiple
                name={name}
                label={label}
                notched
                labelId="resources-label"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.resources || []}
                renderValue={(selected) => selected.map(id => {
                    const resource = resources.find(option => option.id === id);
                    return resource ? resource.label : '';
                }).join(', ')}
                inputProps={{ 'aria-label': 'resources' }}
            >
                {resources ? resources.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        <Checkbox checked={values.resources.includes(option.id)} />
                        <ListItemText primary={option.label} />
                    </MenuItem>
                )) : []}
            </Field>
            {touched.resources && Boolean(errors.resources) && (
                <FormHelperText>{errors.resources}</FormHelperText>
            )}
        </FormControl>
    );
};

export default MultiSelectField;
