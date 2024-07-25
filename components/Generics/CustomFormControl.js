import {FormControl, styled} from "@mui/material";

const CustomFormControl = styled(FormControl)(({ theme }) => ({
    minWidth: 120,
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor:  'rgba(255, 255, 255, 0.87)',
        },
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(255, 255, 255, 0.87)',
        '&.Mui-focused': {
            color:  'rgba(255, 255, 255, 0.87)',
        },
    },
}));

export default CustomFormControl;
