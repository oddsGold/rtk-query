import { api } from "../operations.js";
export const authApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        refreshToken: builder.mutation({
            query: () => ({
                url: '/auth/refresh-tokens',
                method: 'POST',
                body: {},
                headers: {
                    Accept: 'application/json'
                }
            })
        }),
        login: builder.mutation({
            query: ({login, password}) => ({
                url: '/auth/login',
                method: 'POST',
                body: JSON.stringify({ login, password }),
            }),
            invalidatesTags: ['account']
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            })
        }),
        getAccount: builder.query({
            query: () => ({
                url: '/account',
            }),
            providesTags: ['account'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        getMenuItems: builder.query({
            query: () => ({
                url: '/account/menus'
            }),
            transformResponse: (response, meta, arg) => response.data,
        }),
        loginTFA: builder.mutation({
            query: ({code}) => ({
                url: '/auth/tfa',
                method: 'POST',
                body: JSON.stringify({code}),
            }),
            invalidatesTags: ['account']
        }),
        forgotTFA: builder.query({
            query: () => ({
                url: '/auth/tfa/forgot'
            })
        })
    })
});

export const { login, logout, getAccount, loginTFA, refreshToken } = authApiSlice.endpoints;
export const {
    useRefreshTokenMutation,
    useLoginMutation,
    useGetAccountQuery,
    useLogoutMutation,
    useGetMenuItemsQuery,
    useLoginTFAMutation,
    useLazyForgotTFAQuery,
} = authApiSlice;
