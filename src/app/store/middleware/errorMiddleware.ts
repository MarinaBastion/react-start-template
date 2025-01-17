import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom';


/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
       let message =
           'data' in action.error
            ? (action.error.data as { message: string }).message
            : action.error.message
      console.warn('We got a rejected action!')
      console.warn(message)
      localStorage.removeItem("token");
      localStorage.removeItem("user");


    //   toast.warn({
    //     title: 'Async error!',
    //     message:
    //       'data' in action.error
    //         ? (action.error.data as { message: string }).message
    //         : action.error.message,
    //   })
    }

    return next(action)
  }