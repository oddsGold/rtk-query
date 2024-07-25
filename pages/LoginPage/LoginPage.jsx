import DocumentTitle from '../../components/DocumentTitle';
import {LoginForm} from '../../components/LoginForm/LoginForm';
import {Box, styled} from "@mui/material";


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

export default function LoginPage() {
    return (
        <>
            <DocumentTitle>Login Page</DocumentTitle>
            <BackgroundContainer>
                <FormContainer className="form-container sign-in-container">
                    <LoginForm />
                </FormContainer>
            </BackgroundContainer>
        </>
    );
}
