/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */
import fetch from '@kubb/plugin-client/clients/axios'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'
import type { InfiniteData, QueryKey, QueryClient, InfiniteQueryObserverOptions, UseInfiniteQueryResult } from '@tanstack/react-query'
import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query'

export const findPetsByTagsInfiniteQueryKey = (params?: FindPetsByTagsQueryParams) => [{ url: '/pet/findByTags' }, ...(params ? [params] : [])] as const

export type FindPetsByTagsInfiniteQueryKey = ReturnType<typeof findPetsByTagsInfiniteQueryKey>

/**
 * @description Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 * @summary Finds Pets by tags
 * {@link /pet/findByTags}
 */
export async function findPetsByTagsInfinite(
  headers: FindPetsByTagsHeaderParams,
  params?: FindPetsByTagsQueryParams,
  config: Partial<RequestConfig> & { client?: typeof fetch } = {},
) {
  const { client: request = fetch, ...requestConfig } = config

  const res = await request<FindPetsByTagsQueryResponse, ResponseErrorConfig<FindPetsByTags400>, unknown>({
    method: 'GET',
    url: `/pet/findByTags`,
    params,
    ...requestConfig,
    headers: { ...headers, ...requestConfig.headers },
  })
  return findPetsByTagsQueryResponse.parse(res.data)
}

export function findPetsByTagsInfiniteQueryOptions(
  headers: FindPetsByTagsHeaderParams,
  params?: FindPetsByTagsQueryParams,
  config: Partial<RequestConfig> & { client?: typeof fetch } = {},
) {
  const queryKey = findPetsByTagsInfiniteQueryKey(params)
  return infiniteQueryOptions<FindPetsByTagsQueryResponse, ResponseErrorConfig<FindPetsByTags400>, FindPetsByTagsQueryResponse, typeof queryKey, number>({
    queryKey,
    queryFn: async ({ signal, pageParam }) => {
      config.signal = signal

      if (params) {
        params['pageSize'] = pageParam as unknown as FindPetsByTagsQueryParams['pageSize']
      }
      return findPetsByTagsInfinite(headers, params, config)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage['cursor'],
    getPreviousPageParam: (firstPage) => firstPage['cursor'],
  })
}

/**
 * @description Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 * @summary Finds Pets by tags
 * {@link /pet/findByTags}
 */
export function useFindPetsByTagsInfinite<
  TData = InfiniteData<FindPetsByTagsQueryResponse>,
  TQueryData = FindPetsByTagsQueryResponse,
  TQueryKey extends QueryKey = FindPetsByTagsInfiniteQueryKey,
>(
  headers: FindPetsByTagsHeaderParams,
  params?: FindPetsByTagsQueryParams,
  options: {
    query?: Partial<InfiniteQueryObserverOptions<FindPetsByTagsQueryResponse, ResponseErrorConfig<FindPetsByTags400>, TData, TQueryKey>> & {
      client?: QueryClient
    }
    client?: Partial<RequestConfig> & { client?: typeof fetch }
  } = {},
) {
  const { query: { client: queryClient, ...queryOptions } = {}, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findPetsByTagsInfiniteQueryKey(params)

  const query = useInfiniteQuery(
    {
      ...findPetsByTagsInfiniteQueryOptions(headers, params, config),
      queryKey,
      ...queryOptions,
    } as unknown as InfiniteQueryObserverOptions,
    queryClient,
  ) as UseInfiniteQueryResult<TData, ResponseErrorConfig<FindPetsByTags400>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}
