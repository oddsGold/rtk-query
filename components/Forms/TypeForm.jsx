import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {Box, Button, TextField} from "@mui/material";
import React from "react";

export default function DefaultForm({ current = null, defaultCurrent, handleSubmit, enableReinitialize = true, resources = []}) {
    return(
        <Formik
            initialValues={current ? current : defaultCurrent}
            enableReinitialize={enableReinitialize}
            validationSchema={Yup.object({
                title: Yup.string()
                    .max(255, 'Максимально допустиммо 255 символов')
                    .min(3, 'Минимально 3 символа')
                    .required('Поле обезательное к заполнение')
            })}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            {({ isSubmitting, handleChange, handleBlur, setFieldValue, values, errors, touched }) => (
                <Form autoComplete="off">
                    <Box sx={{ mb: 2 }}>
                        <Field
                            as={TextField}
                            fullWidth
                            name="title"
                            label={<>Title *</>}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(errors.title && touched.title)}
                            helperText={touched.title && errors.title}
                        />
                    </Box>
                    <Button
                        sx={{ mt: 2 }}
                        type="submit"
                        variant="contained"
                        color="success"
                    >
                        Save
                    </Button>
                </Form>
            )}
        </Formik>
    )
}
