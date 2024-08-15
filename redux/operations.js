import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {ENDPOINTS} from "../components/Utils/apiConstants.js";
import {logout, refreshToken} from "./auth/authApiSlice.js";
import {setToken} from "./auth/slice.js";

const getCsrfToken = () => {
    const name = 'XSRF-TOKEN=';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
        if (cookie.indexOf(name) === 0) return cookie.substring(name.length, cookie.length);
    }
    return null;
};

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://rtk.query.local/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState, endpoint  }) => {
        const token = getState().auth.token;
        if (token) headers.set('Authorization', `Bearer ${token}`);

        const csrfToken = getCsrfToken();
        if (csrfToken) headers.set('X-Xsrf-Token', csrfToken);


        const excludedEndpoints = [
            ENDPOINTS.UPLOAD,
            ENDPOINTS.UPLOAD_FILE,
            ENDPOINTS.CREATE_MEMO
        ];

        if (!excludedEndpoints.includes(endpoint)) {
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
        }

        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const originalRequest = args;
        try {
            const refreshResult = await refreshToken();

            if (refreshResult?.data) {
                const newToken = refreshResult.data.token;

                api.dispatch(setToken(newToken));

                result = await baseQuery({
                    ...originalRequest,
                    headers: {
                        ...originalRequest.headers,
                        'Authorization': `Bearer ${newToken}`,
                    },
                }, api, extraOptions);
            } else {
                api.dispatch(logout());
            }
        } catch (refreshError) {
            api.dispatch(logout());
        }
    }

    return result;
};


export const api = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})

