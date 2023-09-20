import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  IDomainModel,
  IExtendedDomain,
  IDeleteDomainResponse,
  IAddDomainResponse,
  IGetDomainResponse,
} from './domain.api.types'

export const domainApi = createApi({
  reducerPath: 'domainApi',
  tagTypes: ['Domain', 'IDomain'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({ baseUrl: `/api/` }),
  endpoints: (builder) => ({
    getDomains: builder.query<
      IGetDomainResponse,
      { limit?: number; page?: number; streetId?: string; domainId?: string }
    >({
      query: ({ limit, page, streetId, domainId }) => {
        return {
          url: `domain`,
          method: 'GET',
          params: { limit, page, streetId, domainId },
        }
      },
      providesTags: (response: IGetDomainResponse) =>
        response
          ? response.data.map((item) => ({ type: 'Domain', id: item._id }))
          : [],
      // transformResponse: (response: IGetDomainResponse) => response.data,
    }),
    addDomain: builder.mutation<IAddDomainResponse, IDomainModel>({
      query(data) {
        const { ...body } = data
        return {
          url: 'domain',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['Domain'],
    }),
    deleteDomain: builder.mutation<
      IDeleteDomainResponse,
      IExtendedDomain['_id']
    >({
      query(id) {
        return {
          url: `domain/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (response) => (response ? ['Domain'] : []),
    }),
    editDomain: builder.mutation<IExtendedDomain, Partial<IExtendedDomain>>({
      query(data) {
        const { _id, ...body } = data
        return {
          url: `domain/${_id}`,
          method: 'PATCH',
          body: body,
        }
      },
      invalidatesTags: (response) => (response ? ['Domain'] : []),
    }),
  }),
})

export const {
  useGetDomainsQuery,
  useAddDomainMutation,
  useDeleteDomainMutation,
  useEditDomainMutation,
} = domainApi
