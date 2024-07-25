import { isRejectedWithValue } from '@reduxjs/toolkit';
import { logOutFromTFA } from '../../redux/auth/slice.js';
import { errorHandler } from './errorHandler.js';
import { api } from '../../redux/operations.js';

const isRejectedErrorMiddleware = (store) => (next) => async (action) => {
    if (isRejectedWithValue(action)) {
        const { status, data } = action.payload || {};

        if (status === 401) {
            console.log(status);
            try {
                await store.dispatch(api.endpoints.refreshToken.initiate());

                if (api.endpoints[action.meta?.arg?.endpoint]) {
                    const result = await store.dispatch(action.meta.arg.endpoint.initiate(action.meta.arg.originalArgs));
                    if (result.error) {
                        throw new Error(result.error.message);
                    }
                }
            } catch (error) {
                store.dispatch(logOutFromTFA());
                errorHandler('Session expired. Please log in again.');
            }
        } else {
            const rejectedRequests = store.getState().rejectedRequests || [];
            store.dispatch({
                type: 'rejectedRequests/save',
                payload: [...rejectedRequests, action.meta.arg]
            });
        }
    }

    return next(action);
};

export default isRejectedErrorMiddleware;
