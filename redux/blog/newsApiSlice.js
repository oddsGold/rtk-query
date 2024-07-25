import { api } from "../operations.js";

export const newsApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        news: builder.query({
            query: ({ page = 1, limit = 30, sort = '-id' }) => {
                const params = new URLSearchParams({ page, limit, sort });
                return {
                    url: `/news?${params.toString()}`,
                };
            },
            providesTags: ['news'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        createNews: builder.mutation({
            query: ({data}) => ({
                url: '/news',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['news'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        deleteNews: builder.mutation({
            query: (id) => ({
                url: `/news/${parseInt(id)}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['news']
        }),
        currentNews: builder.query({
            query: (id) => ({
                url: `/news/${parseInt(id)}`
            }),
            providesTags: ['currentNews'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        updateNews: builder.mutation({
            query: ({ data }) => {
                return {
                    url: `/news/${parseInt(data.id)}`,
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['news', 'currentNews'],
            transformResponse: (response, meta, arg) => response.data,
        }),
    })
});

export const {
    useNewsQuery,
    useCurrentNewsQuery,
    useCreateNewsMutation,
    useDeleteNewsMutation,
    useUpdateNewsMutation
} = newsApiSlice;
