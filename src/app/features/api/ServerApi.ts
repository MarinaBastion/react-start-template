import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {SignUpBody} from "../../types/RegisterTypes"

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://19429ba06ff2.vps.myjino.ru/api'}),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => `/profile`,
    }),
    registerUser: builder.mutation({
      query: (body: SignUpBody ) => ({
        url: `/signup`,
        method: 'POST',
        body: { email: body.email, password: body.password, commandId: body.commandId },
      }),
    }),
  }),
});

export const { useGetProfileQuery,useRegisterUserMutation  } = serverApi;