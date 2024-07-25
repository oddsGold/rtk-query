import React from 'react';
import DatePicker from 'react-datepicker';
import { formatISO9075 } from 'date-fns';
import { TextField } from '@mui/material';

const DatePickerField = ({field, form, label, placeholder, minDate, dateFormat = 'dd.MM.yyyy HH:mm', ...props}) => {
    const { name, value } = field;
    const { setFieldValue, errors, touched } = form;

    return (
        <DatePicker
            selected={value ? new Date(value) : null}
            onChange={(val) => {
                setFieldValue(name, val ? formatISO9075(val) : null);
            }}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={1}
            dateFormat={dateFormat}
            timeCaption="time"
            autoComplete="off"
            minDate={minDate ? new Date(minDate) : null}
            placeholderText={placeholder}
            customInput={<TextField
                fullWidth
                label={label}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors[name] && touched[name])}
                helperText={touched[name] && errors[name]}
                {...props}
            />}
        />
    );
};

export default DatePickerField;
