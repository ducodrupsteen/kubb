/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import fetch from '@kubb/plugin-client/clients/axios'
import type {
  UpdatePetWithFormMutationResponse,
  UpdatePetWithFormPathParams,
  UpdatePetWithFormQueryParams,
  UpdatePetWithForm405,
} from '../../models/UpdatePetWithForm.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryClient, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const updatePetWithFormQueryKey = (pet_id: UpdatePetWithFormPathParams['pet_id'], params?: UpdatePetWithFormQueryParams) =>
  ['v5', { url: '/pet/:pet_id', params: { pet_id: pet_id } }, ...(params ? [params] : [])] as const

export type UpdatePetWithFormQueryKey = ReturnType<typeof updatePetWithFormQueryKey>

/**
 * @summary Updates a pet in the store with form data
 * {@link /pet/:pet_id}
 */
export async function updatePetWithFormHook(
  pet_id: UpdatePetWithFormPathParams['pet_id'],
  params?: UpdatePetWithFormQueryParams,
  config: Partial<RequestConfig> & { client?: typeof fetch } = {},
) {
  const { client: request = fetch, ...requestConfig } = config

  const res = await request<UpdatePetWithFormMutationResponse, ResponseErrorConfig<UpdatePetWithForm405>, unknown>({
    method: 'POST',
    url: `/pet/${pet_id}`,
    params,
    ...requestConfig,
  })
  return res.data
}

export function updatePetWithFormQueryOptionsHook(
  pet_id: UpdatePetWithFormPathParams['pet_id'],
  params?: UpdatePetWithFormQueryParams,
  config: Partial<RequestConfig> & { client?: typeof fetch } = {},
) {
  const queryKey = updatePetWithFormQueryKey(pet_id, params)
  return queryOptions<UpdatePetWithFormMutationResponse, ResponseErrorConfig<UpdatePetWithForm405>, UpdatePetWithFormMutationResponse, typeof queryKey>({
    enabled: !!pet_id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return updatePetWithFormHook(pet_id, params, config)
    },
  })
}

/**
 * @summary Updates a pet in the store with form data
 * {@link /pet/:pet_id}
 */
export function useUpdatePetWithFormHook<
  TData = UpdatePetWithFormMutationResponse,
  TQueryData = UpdatePetWithFormMutationResponse,
  TQueryKey extends QueryKey = UpdatePetWithFormQueryKey,
>(
  pet_id: UpdatePetWithFormPathParams['pet_id'],
  params?: UpdatePetWithFormQueryParams,
  options: {
    query?: Partial<QueryObserverOptions<UpdatePetWithFormMutationResponse, ResponseErrorConfig<UpdatePetWithForm405>, TData, TQueryData, TQueryKey>> & {
      client?: QueryClient
    }
    client?: Partial<RequestConfig> & { client?: typeof fetch }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? updatePetWithFormQueryKey(pet_id, params)

  const query = useQuery(
    {
      ...updatePetWithFormQueryOptionsHook(pet_id, params, config),
      queryKey,
      ...queryOptions,
    } as unknown as QueryObserverOptions,
    queryClient,
  ) as UseQueryResult<TData, ResponseErrorConfig<UpdatePetWithForm405>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
