import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom';
import { ErrorData } from 'src/app/types/ResponseErrors';


/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
       let message = "" ;
        if('payload' in action)
            message =(action.payload as ErrorData).status + " " +(action.payload as ErrorData).data.errors[0].message
        if ('error' in action)
            message = message + action.error.message 
      console.warn('We got a rejected action!')
      console.warn(message)
      localStorage.removeItem("token");
      localStorage.removeItem("token");


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