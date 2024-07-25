import { api } from "../operations.js";

export const faqApiSlice = api.injectEndpoints({
    endpoints: builder => ({
        faq: builder.query({
            query: ({ page = 1, limit = 30, sort = '-id' }) => {
                const params = new URLSearchParams({ page, limit, sort });
                return {
                    url: `/faqs?${params.toString()}`,
                };
            },
            providesTags: ['faqs'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        deleteFaq: builder.mutation({
            query: (id) => ({
                url: `/faqs/${parseInt(id)}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['faqs']
        }),
        createFaq: builder.mutation({
            query: ({data}) => ({
                url: '/faqs',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['faqs'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        currentFaq: builder.query({
            query: (id) => ({
                url: `/faqs/${parseInt(id)}`
            }),
            providesTags: ['currentFaq'],
            transformResponse: (response, meta, arg) => response.data,
        }),
        updateFaq: builder.mutation({
            query: ({ data }) => {
                return {
                    url: `/faqs/${parseInt(data.id)}`,
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['faqs', 'currentFaq'],
            transformResponse: (response, meta, arg) => response.data,
        }),
    })
});

export const {
    useFaqQuery,
    useDeleteFaqMutation,
    useCreateFaqMutation,
    useCurrentFaqQuery,
    useUpdateFaqMutation
} = faqApiSlice;
