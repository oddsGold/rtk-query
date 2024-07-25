import { api } from "../../operations.js";
import { ENDPOINTS } from '../../../components/Utils/apiConstants.js';

export const memoApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        memo: builder.query({
            query: ({ page = 1, limit = 30, sort = '-id' }) => {
                const params = new URLSearchParams({ page, limit, sort });
                return {
                    url: `/users/memos?${params.toString()}`,
                };
            },
            providesTags: ['memos'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        deleteMemo: builder.mutation({
            query: (id) => ({
                url: `/users/memos/${parseInt(id)}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['memos']
        }),
        [ENDPOINTS.CREATE_MEMO]: builder.mutation({
            query: ({data}) => ({
                url: '/users/memos',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['memos'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        currentMemo: builder.query({
            query: (id) => ({
                url: `/users/memos/${parseInt(id)}`
            }),
            providesTags: ['currentMemo'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        updateMemo: builder.mutation({
            query: ({ data }) => {
                return {
                    url: `/users/memos/${parseInt(data.id)}`,
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['memos', 'currentMemo'],
            transformResponse: (response, meta, arg) => response.data,
        }),
    })
});

export const {
    useMemoQuery,
    useDeleteMemoMutation,
    useCreateMemoMutation,
    useCurrentMemoQuery,
    useUpdateMemoMutation
} = memoApiSlice;
