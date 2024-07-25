import { api } from "../operations.js";

export const usersApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        users: builder.query({
            query: ({ page = 1, limit = 30 }) => ({
                url: `/users?page=${page}&limit=${limit}`,
            }),
            providesTags: ['users'],
            transformResponse: (response, meta, arg) => ({
                users: response.data,
                pageCount: response.meta.total
            }),
        }),
        createUser: builder.mutation({
            query: ({data}) => ({
                url: '/users',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['users'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        currentUser: builder.query({
            query: (id) => ({
                url: `/users/${id}`
            }),
            providesTags: ['current'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        updateUser: builder.mutation({
            query: ({data}) => ({
                url: `/users/${parseInt(data.id)}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['users', 'current'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${parseInt(id)}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['users'],
        }),
        roles: builder.query({
            query: ({page = 1, limit = 30}) => ({
                url: `/roles?page=${page}&limit=${limit}`
            }),
            providesTags: ['roles'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        deleteRole: builder.mutation({
            query: (id) => ({
                url: `/roles/${parseInt(id)}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['roles']
        }),
        resources: builder.query({
            query: () => ({
                url: '/resources'
            }),
            transformResponse: (response, meta, arg) => response.data,
        }),
        createRole: builder.mutation({
            query: ({data}) => ({
                url: '/roles',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['roles'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        currentRole: builder.query({
            query: (id) => ({
                url: `/roles/${parseInt(id)}`
            }),
            providesTags: ['currentRole'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        updateRole: builder.mutation({
            query: ({ data }) => {
                return {
                    url: `/roles/${parseInt(data.id)}`,
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['roles', 'currentRole'],
            transformResponse: (response, meta, arg) => response.data,
        }),
    })
});

export const {
    useUsersQuery,
    useCreateUserMutation,
    useCurrentUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useRolesQuery,
    useDeleteRoleMutation,
    useResourcesQuery,
    useCreateRoleMutation,
    useCurrentRoleQuery,
    useUpdateRoleMutation
} = usersApiSlice;
