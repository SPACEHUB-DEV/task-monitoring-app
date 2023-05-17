import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ObjectId } from 'mongoose'
import { AllStreetsQuery, IStreet, BaseQuery } from './street.api.types'

export const streetApi = createApi({
  reducerPath: 'streetApi',
  tagTypes: ['Street', 'IStreet'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({ baseUrl: `/api/` }),
  endpoints: (builder) => ({
    getStreetById: builder.query<BaseQuery, string>({
      query: (id) => `/streets/${id}`,
      providesTags: (result) => ['Street'],
    }),
    // TODO: fix and add typisation
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getAllStreets: builder.query<any>({
      query: () => '/streets',
      providesTags: (response) =>
        response
          ? response.map((item) => ({ type: 'Street', id: item._id }))
          : [],
      transformResponse: (response: AllStreetsQuery) => response.data,
    }),
    addStreet: builder.mutation<IStreet, Partial<IStreet>>({
      query(body) {
        return {
          url: `streets`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['Street'],
    }),
    deleteStreet: builder.mutation<{ success: boolean; id: ObjectId }, string>({
      query(id) {
        return {
          url: `streets/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Street'],
    }),
    editStreet: builder.mutation<IStreet, Partial<IStreet>>({
      query(data) {
        const { _id, ...body } = data
        return {
          url: `streets/${_id}`,
          method: 'PATCH',
          body,
        }
      },
      invalidatesTags: ['Street'],
    }),
  }),
})

export const {
  useGetAllStreetsQuery,
  useAddStreetMutation,
  useDeleteStreetMutation,
  useEditStreetMutation,
  useGetStreetByIdQuery,
} = streetApi
