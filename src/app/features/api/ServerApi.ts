import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {SignUpBody,ProductFilterQuery, ProductsResult, Product, ProductBody} from "../../types/RegisterTypes"
import {Category,CategoryFilters,CategoryResponse} from "../../types/Category"
import { ProductType } from 'src/app/services/Types';
import { OrderPostRequest } from 'src/app/types/Orders';

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://19429ba06ff2.vps.myjino.ru/api'}),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => `/profile`,
    }),
    getProducts: builder.query({
      query: (q:ProductFilterQuery) => {
      let params = new URLSearchParams({
        pagination: JSON.stringify({
          pageSize: q.pageSize,
          pageNumber: q.pageNumber,
        }),
        sorting: JSON.stringify({ type: q.type, field: q.field }),
      }).toString()
      return ({
        url: '/products'+'?'+params,
      })
    },
    }),
    getCategories: builder.query({
      query: (q:CategoryFilters) => {
        debugger;
      let params = new URLSearchParams({
        pagination: JSON.stringify({
          pageSize: q.pagination.pageSize,
          pageNumber: q.pagination.pageNumber,
        }),
        sorting: JSON.stringify({ type: q.sorting.type, field: q.sorting.field }),
      }).toString()
      return ({
        url: '/categories'+'?'+params,
      })
    },
    }),
    registerUser: builder.mutation({
      query: (body: SignUpBody ) => (
        {      
        url: `/signup`,
        method: 'POST',
        body: { email: body.email, password: body.password, commandId: body.commandId },
      })     
    }),
    
    addProduct: builder.mutation({
  
      query: (body: ProductBody ) => ({
        url: `/products`,
        method: 'POST',
        body: { name: body.name, photo: body.photo, desc: body.desc, oldPrice:body.oldPrice,price: body.price, categoryId:body.categoryId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      })     
    }),
    addOrder: builder.mutation({
      query: (body: OrderPostRequest ) => ({
        url: `/orders`,
        method: 'POST',
        body: {  products: body.products, status: body.status},
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      })     
    }),
  }),
});

export const { useGetProfileQuery,useRegisterUserMutation ,useGetProductsQuery ,useGetCategoriesQuery, useAddProductMutation,useAddOrderMutation} = serverApi;