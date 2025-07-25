/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 * Source: petStore.yaml
 * Title: Swagger Petstore - OpenAPI 3.0
 * Description: This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about
 * Swagger at [https://swagger.io](https://swagger.io). In the third iteration of the pet store, we've switched to the design first approach!
 * You can now help us improve the API whether it's by making changes to the definition itself or to the code.
 * That way, with time, we can improve the API in general, and expose some of the new features in OAS3.
 *
 * Some useful links:
 * - [The Pet Store repository](https://github.com/swagger-api/swagger-petstore)
 * - [The source API definition for the Pet Store](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml)
 * OpenAPI spec version: 1.0.11
 */

import fetch from '@kubb/plugin-client/clients/axios'
import type { GetInventoryQueryResponse } from '../models/GetInventory.ts'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { QueryKey, QueryClient, CreateBaseQueryOptions, CreateQueryResult } from '@tanstack/svelte-query'
import { queryOptions, createQuery } from '@tanstack/svelte-query'

export const getInventoryQueryKey = () => [{ url: '/store/inventory' }] as const

export type GetInventoryQueryKey = ReturnType<typeof getInventoryQueryKey>

/**
 * @description Returns a map of status codes to quantities
 * @summary Returns pet inventories by status
 * {@link /store/inventory}
 */
export async function getInventory(config: Partial<RequestConfig> & { client?: typeof fetch } = {}) {
  const { client: request = fetch, ...requestConfig } = config

  const res = await request<GetInventoryQueryResponse, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: '/store/inventory', ...requestConfig })
  return res.data
}

export function getInventoryQueryOptions(config: Partial<RequestConfig> & { client?: typeof fetch } = {}) {
  const queryKey = getInventoryQueryKey()
  return queryOptions<GetInventoryQueryResponse, ResponseErrorConfig<Error>, GetInventoryQueryResponse, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getInventory(config)
    },
  })
}

/**
 * @description Returns a map of status codes to quantities
 * @summary Returns pet inventories by status
 * {@link /store/inventory}
 */
export function createGetInventory<
  TData = GetInventoryQueryResponse,
  TQueryData = GetInventoryQueryResponse,
  TQueryKey extends QueryKey = GetInventoryQueryKey,
>(
  options: {
    query?: Partial<CreateBaseQueryOptions<GetInventoryQueryResponse, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>> & { client?: QueryClient }
    client?: Partial<RequestConfig> & { client?: typeof fetch }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getInventoryQueryKey()

  const query = createQuery(
    {
      ...getInventoryQueryOptions(config),
      queryKey,
      ...queryOptions,
    } as unknown as CreateBaseQueryOptions,
    queryClient,
  ) as CreateQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
