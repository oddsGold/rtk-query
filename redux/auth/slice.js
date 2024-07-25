import { createSlice } from '@reduxjs/toolkit';
import {getAccount, login, loginTFA, logout, refreshToken} from "./authApiSlice.js";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        tfa: false,
        tfaQrCode: null,
    },
    reducers: {
        logOutFromTFA: (state, action) => {
            state.token = "";
            state.tfa = false;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(login.matchFulfilled, (state, { payload }) => {
                state.token = payload['access-token'];
                if(payload['tfa']) {
                    state.tfa =  payload['tfa'];
                    state.tfaQrCode = payload['tfa_qr_code'];
                }
        });
        builder.addMatcher(loginTFA.matchFulfilled, (state, { payload }) => {
            state.token = payload['access-token'];
            state.tfa = false;
        });
        builder.addMatcher(getAccount.matchRejected, (state, action) => {
            state.token = "";
        });
        builder.addMatcher(logout.matchFulfilled, (state, { payload }) => {
            state.token = "";
            state.tfa = false;
        });
        builder.addMatcher(refreshToken.matchFulfilled, (state, { payload }) => {
            state.token = payload['access-token'];
        });
        builder.addMatcher(refreshToken.matchRejected, (state, { payload }) => {
            state.token = "";
        });
    }
});

export const { logOutFromTFA } = authSlice.actions;
export default authSlice.reducer;
