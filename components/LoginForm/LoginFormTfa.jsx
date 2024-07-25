import React, {useEffect, useRef} from 'react';
import {useLazyForgotTFAQuery, useLoginTFAMutation} from "../../redux/auth/authApiSlice.js";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import {Box, CssBaseline, styled} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {errorHandler} from "../Utils/errorHandler.js";
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useDispatch} from "react-redux";
import {logOutFromTFA} from "../../redux/auth/slice.js";

const defaultTheme = createTheme();

const BackgroundContainer = styled(Box)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(250deg, #8e44ad 0%, #3498db 100%)',
        filter: 'blur(20px)',
    },
}));

const FormContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
}));

export const LoginFormTfa = ({QrCode}) => {
    const [loginTFA, {isLoading: isLoginTFALoading}] = useLoginTFAMutation();
    const [triggerForgotTFA, {isLoading: isForgotTFAFetching}] = useLazyForgotTFAQuery();
    const userRef = useRef(null);
    const errRef = useRef(null);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(logOutFromTFA());
    };

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    const handleLoginTFA = async (values, {setSubmitting}) => {
        try {
            await loginTFA(values).unwrap();
            setSubmitting(false);
        } catch (err) {
            errorHandler(err.data.message);
            if (errRef.current) {
                errRef.current.focus();
            }
            setSubmitting(false);
        }
    };

    const handleForgotTFA = async () => {
        try {
            await triggerForgotTFA();
        } catch (error) {
            console.error("Error in TFA forgot:", error);
        }
    };

    return (
        <>
            <BackgroundContainer>
                <FormContainer className="form-container sign-in-container">
                    <section className="login">
                        <ThemeProvider theme={defaultTheme}>
                            <Container component="main" maxWidth="sm">
                                <CssBaseline/>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                        <LockOutlinedIcon/>
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Sign in
                                    </Typography>
                                </Box>

                                {QrCode && <div>
                                    <div><img src={QrCode} className="qr"/></div>
                                </div>}

                                <Formik
                                    initialValues={{code: ''}}
                                    validationSchema={Yup.object({
                                        code: Yup.string()
                                            .required('TFA code is required'),
                                    })}
                                    onSubmit={handleLoginTFA}
                                >
                                    {({isSubmitting, handleChange, handleBlur, values, errors, touched}) => (
                                        <Form autoComplete="off">
                                            <Field
                                                margin="normal"
                                                fullWidth
                                                name="code"
                                                label="Enter TFA code"
                                                type="code"
                                                id="tfa"
                                                as={TextField}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.tfa}
                                                error={Boolean(errors.code && touched.code)}
                                                helperText={touched.code && errors.code}
                                            />
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{mt: 3, mb: 2}}
                                                disabled={isSubmitting}
                                            >
                                                Send
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 1, mb: 2}}
                                    onClick={handleForgotTFA}
                                >
                                    {isForgotTFAFetching ? 'Sending...' : 'Send to email'}
                                </Button>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{mt: 1}}
                                    onClick={handleLogout}
                                    aria-label="back"
                                >
                                    <ArrowBackIcon />
                                    Back
                                </Button>

                            </Container>
                        </ThemeProvider>
                    </section>
                </FormContainer>
            </BackgroundContainer>
        </>
    );
}
