import React, {useState} from "react";
import {Box, Button, DialogContent, DialogTitle, TextField, IconButton, Typography} from "@mui/material";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import EditIcon from '@mui/icons-material/Edit';
import {useUpdateEmailMutation, useUpdatePasswordMutation} from "../../redux/users/usersApiSlice.js";

const SettingsForm = ({onClose, user}) => {
    const [editEmail, setEditEmail] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    const [updateEmail, {isLoading: isUpdateEmailLoading}] = useUpdateEmailMutation();
    const [updatePassword, {isLoading: isUpdatePasswordLoading}] = useUpdatePasswordMutation();

    const initialValues = {
        old_password: "",
        password: "",
        password_confirmation: ""
    };

    const emailValidationSchema = Yup.object().shape({
        email: Yup.string().email("Некорректный email").required("Это поле обязательно"),
    });

    const passwordValidationSchema = Yup.object().shape({
        old_password: changePassword ? Yup.string().required("Введите текущий пароль") : Yup.string(),
        password: changePassword
            ? Yup.string()
                .min(3, "Пароль должен содержать минимум 3 символов")
                .required("Введите новый пароль")
            : Yup.string(),
        password_confirmation: changePassword
            ? Yup.string()
                .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
                .required("Подтвердите новый пароль")
            : Yup.string(),
    });

    const handleEmailSubmit = async (values, {setSubmitting}) => {
        await updateEmail({data: values}).unwrap();
        setSubmitting(false);
        setEditEmail(false);
    };

    const handlePasswordSubmit = async (values, {setSubmitting}) => {
        await updatePassword({data: values}).unwrap();
        setSubmitting(false);
        setChangePassword(false);
    };

    return (
        <>
            <DialogTitle sx={{ fontWeight: 'bold' }} variant="h3">
                User Settings
            </DialogTitle>
            <DialogContent sx={{ width: '600px', maxWidth: '100%', paddingTop: '10px' }}>
                <Box sx={{mb: 2, minHeight: "22px"}}>
                    <Typography variant="body1">Login: {user.login}</Typography>
                </Box>

                <Box sx={{mb: 2, minHeight: "22px"}}>
                    <Typography variant="body1">Role: {user.role.name}</Typography>
                </Box>

                <Box sx={{mb: 2}}>
                    <Typography variant="body1">
                        Email: {user.email}
                        {!editEmail ? (
                            <IconButton  sx={{padding: "0 12px"}} onClick={() => setEditEmail(true)}>
                                <EditIcon/>
                            </IconButton>
                        ) : ""}
                    </Typography>
                </Box>

                {editEmail ? (
                    <Box sx={{mb: 2, display: 'flex', flexDirection: 'column'}}>
                        <Formik
                            initialValues={{email: ""}}
                            validationSchema={emailValidationSchema}
                            onSubmit={handleEmailSubmit}
                        >
                            {({errors, touched, isSubmitting}) => (
                                <Form style={{display: 'flex', alignItems: 'flexStart', flexDirection: 'column'}}>
                                    <Field
                                        as={TextField}
                                        name="email"
                                        label="New Email"
                                        variant="outlined"
                                        size="small"
                                        error={touched.email && !!errors.email}
                                        helperText={touched.email && errors.email}
                                        style={{marginRight: '8px'}}
                                    />
                                    <Box sx={{mt: 2}}>
                                        <Button sx={{mr: 2}} onClick={() => setEditEmail(false)} variant="contained"
                                                color="primary">
                                            Cancel
                                        </Button>
                                        <Button type="submit" variant="contained" color="primary"
                                                disabled={isSubmitting}>
                                            Save
                                        </Button>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                </Box>) : ""}


                {!changePassword ? (
                    <>
                        <Box sx={{mb: 2}}>
                            <Button
                                type="button"
                                variant="contained"
                                onClick={() => setChangePassword(!changePassword)}
                            >
                                {!changePassword ? "Change Password" : ""}
                            </Button>
                        </Box>
                    </>) : ""}


                {changePassword && (
                    <Formik
                        initialValues={initialValues}
                        validationSchema={passwordValidationSchema}
                        onSubmit={handlePasswordSubmit}
                    >
                        {({errors, touched, isSubmitting}) => (
                            <Form>
                                <Box sx={{mb: 2}}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        name="old_password"
                                        label="Old Password"
                                        type="password"
                                        variant="outlined"
                                        error={touched.old_password && !!errors.old_password}
                                        helperText={touched.old_password && errors.old_password}
                                    />
                                </Box>

                                <Box sx={{mb: 2}}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        name="password"
                                        label="New Password"
                                        type="password"
                                        variant="outlined"
                                        error={touched.password && !!errors.password}
                                        helperText={touched.password && errors.password}
                                    />
                                </Box>

                                <Box sx={{mb: 2}}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        name="password_confirmation"
                                        label="Confirm New Password"
                                        type="password"
                                        variant="outlined"
                                        error={touched.password_confirmation && !!errors.password_confirmation}
                                        helperText={touched.password_confirmation && errors.password_confirmation}
                                    />
                                </Box>

                                <Box display="flex" justifyContent="flex-start" mt={2}>
                                    <Button onClick={() => setChangePassword(!changePassword)} sx={{mr: 2}}
                                            variant="contained" color="primary">
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        style={{marginLeft: 8}}
                                        disabled={isSubmitting}
                                    >
                                        Save
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                )}

                <Box display="flex" justifyContent="flex-end">
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                </Box>
            </DialogContent>
        </>
    );
};

export default SettingsForm;
