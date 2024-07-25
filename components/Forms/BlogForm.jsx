import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import DatePickerField from "../Generics/DatePickerField.jsx";

export default function DefaultForm({ current = null, defaultCurrent, handleSubmit, enableReinitialize = true, resources = [] }) {

    return (
        <Formik
            initialValues={current ? current : defaultCurrent}
            enableReinitialize={enableReinitialize}
            validationSchema={Yup.object({
                title: Yup.string()
                    .max(255, 'Максимально допустиммо 255 символов')
                    .min(3, 'Минимально 3 символа')
                    .required('Поле обязательное к заполнению'),
                url: Yup.string().required('Поле обязательное к заполнению'),
                description: Yup.string()
                    .max(400, 'Максимально допустиммо 400 символов')
                    .required('Поле обязательное к заполнению'),
                published: Yup.boolean(),
                published_at: Yup.date().nullable().when('published', {
                    is: true,
                    then: (schema) => schema.nullable()
                }),
                published_to: Yup.date().nullable().when(['published', 'published_at'], {
                    is: (published, published_at) => published && !!published_at,
                    then: (schema) => schema.min(Yup.ref('published_at'), 'Дата окончания публикации не может быть раньше даты начала публикации'),
                    otherwise: (schema) => schema.nullable()
                }),
            })}
            onSubmit={(values) => {
                const formattedValues = {
                    ...values,
                    published_at: values.published_at ? format(new Date(values.published_at), "yyyy-MM-dd HH:mm:ss") : "",
                    published_to: values.published_to ? format(new Date(values.published_to), "yyyy-MM-dd HH:mm:ss") : "",
                };
                handleSubmit(formattedValues);
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
                    <Box sx={{ mb: 2 }}>
                        <Field
                            as={TextField}
                            fullWidth
                            name="url"
                            label={<>Url *</>}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(errors.url && touched.url)}
                            helperText={touched.url && errors.url}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Field
                            as={TextField}
                            multiline
                            rows={4}
                            fullWidth
                            name="description"
                            label={<>Description *</>}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(errors.description && touched.description)}
                            helperText={touched.description && errors.description}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <FormControlLabel
                            control={<Checkbox
                                checked={values.published}
                                onChange={() => setFieldValue('published', !values.published)}
                            />}
                            label="Опубликовать"
                        />
                    </Box>
                    {values.published && (
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePickerField
                                    field={{ name: 'published_at', value: values.published_at }}
                                    form={{ setFieldValue, errors, touched }}
                                    label={<>Published From</>}
                                    placeholder="С которой даты начать публикацию"
                                    minDate={null}
                                />
                                <DatePickerField
                                    field={{ name: 'published_to', value: values.published_to }}
                                    form={{ setFieldValue, errors, touched }}
                                    label={<>Published To</>}
                                    placeholder="По которую дату публиковать"
                                    minDate={values.published_at}
                                />
                            </LocalizationProvider>
                        </Box>
                    )}
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
    );
}
