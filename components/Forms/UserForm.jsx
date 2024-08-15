import React from "react";
import * as Yup from 'yup';
import {
    Box, Button, Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {Form, Field, Formik} from "formik";
import RequiredStar from "../Generics/RequiredStar.js";
export default function DefaultForm({current = null, defaultCurrent, handleSubmit, enableReinitialize = true, roles = []}) {
        return (
        <Formik
            initialValues={current ? current : defaultCurrent}
            enableReinitialize={enableReinitialize}
            validationSchema={Yup.object().shape({
                login: Yup.string().required('Login is required'),
                email: Yup.string().email('Invalid email').required('Email is required'),
                role: Yup.mixed().required('Role is required'),
                password: Yup.string()
                    .max(255, 'Максимально допустиммо 180 символов')
                    .min(8, 'Минимально 8 символа')
                    .nullable('Поле обезательное к заполнение'),
                password_confirmation: Yup.string()
                    .oneOf([Yup.ref('password')], 'Пароли не совпадают')
                    .nullable('Поле обезательное к заполнение')
            })}
            onSubmit={(values) => {
                const valuesToSend = {
                    ...values,
                    tfa: values.tfa ? 1 : 0,
                };
                handleSubmit(valuesToSend);
            }}
        >
            {({isSubmitting, handleChange, handleBlur, values,  errors, touched, setFieldValue }) => (
                <Form autoComplete="off">
                    <Box sx={{ mb: 2 }}>
                        <Field
                            as={TextField}
                            fullWidth
                            name="login"
                            label={<>Login <RequiredStar>*</RequiredStar></>}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(errors.login && touched.login)}
                            helperText={touched.login && errors.login}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Field
                            as={TextField}
                            fullWidth
                            name="email"
                            type="email"
                            label={<>Email <RequiredStar>*</RequiredStar></>}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(errors.email && touched.email)}
                            helperText={touched.email && errors.email}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <FormControl fullWidth variant="outlined" error={touched.role && Boolean(errors.role)}>
                            <InputLabel shrink={true}>
                                Role <RequiredStar>*</RequiredStar>
                            </InputLabel>
                            <Field
                                as={Select}
                                name="role"
                                label="Role"
                                notched
                                labelId="role-label"
                                inputProps={{ 'aria-label': 'role' }}
                                value={values.role || ''}
                            >
                                {roles ? roles.map((role) => (
                                    <MenuItem key={role.id} value={role.id}>
                                        {role.label}
                                    </MenuItem>
                                )) : []}
                            </Field>
                            {touched.role && Boolean(errors.role) && (
                                <FormHelperText>{errors.role}</FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Field
                            as={TextField}
                            fullWidth
                            name="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputLabelProps={{ shrink: true }}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Field
                            as={TextField}
                            fullWidth
                            name="password_confirmation"
                            type="password"
                            label="Confirm Password"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputLabelProps={{ shrink: true }}
                            error={touched.password_confirmation && Boolean(errors.password_confirmation)}
                            helperText={touched.password_confirmation && errors.password_confirmation}
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <FormControlLabel
                            control={<Checkbox
                                checked={values.tfa}
                                onChange={() => setFieldValue('tfa', !values.tfa)}
                            />}
                            label="Включить двухфакторную аутентификацию"
                        />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        // disabled={isSubmitting}
                    >
                        Save
                    </Button>
                </Form>
            )}
        </Formik>
    )
}
