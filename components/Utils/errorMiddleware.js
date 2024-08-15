import {isRejectedWithValue} from '@reduxjs/toolkit';
import {api} from '../../redux/operations.js';
import { unwrapResult } from '@reduxjs/toolkit';

const isRejectedErrorMiddleware = (store) => (next) => async (action) => {
    if (isRejectedWithValue(action)) {
        const {status} = action.payload || {};
        const endpointName = action.meta?.arg?.endpointName;
        const originalArgs = action.meta?.arg?.originalArgs;

        if (status === 401) {
            try {
                const refreshResult = await store.dispatch(api.endpoints.refreshToken.initiate(undefined, { forceRefetch: true }));
                console.log("refreshResult -", refreshResult);

                if (refreshResult.status === 'fulfilled') {
                    console.log("Token refresh fulfilled");

                    const refreshResult2 = await store.dispatch(api.endpoints[endpointName].initiate(originalArgs, { forceRefetch: true }));
                    console.log("refreshResult2 -", refreshResult2);

                    // Добавим цикл для проверки завершения второго запроса
                    let checkCount = 0;
                    const maxChecks = 10;
                    const checkInterval = 500; // 500 мс

                    const checkRequestCompletion = async () => {
                        if (checkCount < maxChecks) {
                            checkCount++;
                            const currentState = store.getState();
                            const requestState = currentState.api.queries[refreshResult2.requestId];

                            console.log(`Check ${checkCount}:`, requestState);

                            if (requestState?.status === 'fulfilled') {
                                console.log("Second request fulfilled:", requestState.data);
                            } else if (requestState?.status === 'rejected') {
                                console.error("Second request rejected:", requestState.error);
                            } else {
                                setTimeout(checkRequestCompletion, checkInterval);
                            }
                        } else {
                            console.error("Second request did not complete within expected time frame.");
                        }
                    };

                    checkRequestCompletion();
                } else {
                    console.error("Token refresh failed:", refreshResult.error);
                }
            } catch (error) {
                console.error("Error during token refresh or second request:", error);
            }
        }
    }

    return next(action);
};

export default isRejectedErrorMiddleware;
