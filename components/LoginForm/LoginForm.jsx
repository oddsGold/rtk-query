import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useRef, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLoginMutation} from '../../redux/auth/authApiSlice.js';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Box, CssBaseline} from "@mui/material";
import {errorHandler} from "../Utils/errorHandler.js";
import {Loading} from "../LoadingBar/Loading.jsx";


const defaultTheme = createTheme();

export const LoginForm = () => {
    const userRef = useRef(null);
    const errRef = useRef(null);
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    const handleSubmit = async (values, {setSubmitting}) => {
        try {
            await login(values).unwrap();
            setSubmitting(false);
            navigate('/admin/dashboard');
        } catch (err) {
            errorHandler(err.data.message);
            if (errRef.current) {
                errRef.current.focus();
            }
            setSubmitting(false);
        }
    };

    return (
        isLoading ? (
            <Loading />
            ) : (
            <section className="login">
                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
                    {errMsg}
                </p>

                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="sm" sx={{padding: '25px'}}>
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
                        <Formik
                            initialValues={{login: '', password: ''}}
                            validationSchema={Yup.object({
                                login: Yup.string().required('Name is required').max(255),
                                password: Yup.string()
                                    .min(3, 'Password must be at least 3 characters')
                                    .max(255, 'Password must be at most 255 characters')
                                    .required('Password is required'),
                            })}
                            onSubmit={handleSubmit}
                        >
                            {({isSubmitting, handleChange, handleBlur, values, errors, touched}) => (
                                <Form autoComplete="off">
                                    <Field
                                        margin="normal"
                                        variant="outlined"
                                        color="secondary"
                                        sx={{mb: 1}}
                                        fullWidth
                                        id="login"
                                        label="Enter your login"
                                        name="login"
                                        autoFocus
                                        as={TextField}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.login}
                                        error={Boolean(errors.login && touched.login)}
                                        helperText={touched.login && errors.login}
                                    />
                                    <Field
                                        margin="normal"
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        as={TextField}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        error={Boolean(errors.password && touched.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{mt: 3, mb: 2}}
                                        disabled={isSubmitting}
                                    >
                                        Sign In
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Container>
                </ThemeProvider>
            </section>
            )
    );
};
