import {Field, Form, Formik} from "formik";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormHelperText,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import React from "react";
import * as Yup from "yup";
import RequiredStar from "../Generics/RequiredStar.js";
import MultiSelectField from "../Generics/MultiSelectField.jsx";

export default function DefaultForm({current = null, defaultCurrent, handleSubmit, enableReinitialize = true, resources= []}) {
    return(
        <Formik
            initialValues={current ? current : defaultCurrent}
            enableReinitialize={enableReinitialize}
            validationSchema={Yup.object().shape({
                label: Yup.string().min(3).max(255).required('Label is required'),
                resources: Yup.array().of(Yup.mixed()).min(1, 'Выберите ресурс').required('Поле обезательное к заполнение')
            })}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {({isSubmitting, handleChange, handleBlur, values,  errors, touched, setFieldValue }) => (
                <Form autoComplete="off">
                    <Box sx={{ mb: 2 }}>
                        <Field
                            as={TextField}
                            fullWidth
                            name="label"
                            label={<>Label <RequiredStar>*</RequiredStar></>}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(errors.label && touched.label)}
                            helperText={touched.label && errors.label}
                        />
                    </Box>

                    <MultiSelectField
                        name="resources"
                        label="Resources"
                        resources={resources}
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />

                    <Button
                        sx={{ mt: 2 }}
                        type="submit"
                        variant="contained"
                        color="success"
                    >
                        Save
                    </Button>
                </Form>)}
        </Formik>
    )
}
