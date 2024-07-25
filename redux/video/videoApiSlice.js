import { api } from "../operations.js";

export const videoApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        video: builder.query({
            query: ({ page = 1, limit = 30, sort = '-id' }) => {
                const params = new URLSearchParams({ page, limit, sort });
                return {
                    url: `/videos?${params.toString()}`,
                };
            },
            providesTags: ['videos'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${parseInt(id)}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['videos']
        }),
        createVideo: builder.mutation({
            query: ({data}) => ({
                url: '/videos',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['videos'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        currentVideo: builder.query({
            query: (id) => ({
                url: `/videos/${parseInt(id)}`
            }),
            providesTags: ['currentVideo'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        updateVideo: builder.mutation({
            query: ({ data }) => {
                return {
                    url: `/videos/${parseInt(data.id)}`,
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['videos', 'currentVideo'],
            transformResponse: (response, meta, arg) => response.data,
        }),
    })
});

export const {
    useVideoQuery,
    useDeleteVideoMutation,
    useCreateVideoMutation,
    useCurrentVideoQuery,
    useUpdateVideoMutation
} = videoApiSlice;
