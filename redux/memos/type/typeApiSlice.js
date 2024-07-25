import { api } from "../../operations.js";

export const faqApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        type: builder.query({
            query: ({ page = 1, limit = 30, sort = '-id' }) => {
                const params = new URLSearchParams({ page, limit, sort });
                return {
                    url: `/users/memos/types?${params.toString()}`,
                };
            },
            providesTags: ['types'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        deleteType: builder.mutation({
            query: (id) => ({
                url: `/users/memos/types/${parseInt(id)}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['types']
        }),
        createType: builder.mutation({
            query: ({data}) => ({
                url: '/users/memos/types',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['types'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        currentType: builder.query({
            query: (id) => ({
                url: `/users/memos/types/${parseInt(id)}`
            }),
            providesTags: ['currentType'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        updateType: builder.mutation({
            query: ({ data }) => {
                return {
                    url: `/users/memos/types/${parseInt(data.id)}`,
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['types', 'currentType'],
            transformResponse: (response, meta, arg) => response.data,
        }),
    })
});

export const {
    useTypeQuery,
    useDeleteTypeMutation,
    useCreateTypeMutation,
    useCurrentTypeQuery,
    useUpdateTypeMutation
} = faqApiSlice;
