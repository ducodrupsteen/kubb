/* eslint-disable no-alert, no-console */
/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import fetch from '@kubb/plugin-client/clients/axios'
import type {
  GetUserByNameQueryResponse,
  GetUserByNamePathParams,
  GetUserByName400,
  GetUserByName404,
} from '../../../models/ts/userController/GetUserByName.js'
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/axios'

function getGetUserByNameUrl({ username }: { username: GetUserByNamePathParams['username'] }) {
  return `/user/${username}` as const
}

/**
 * @summary Get user by user name
 * {@link /user/:username}
 */
export async function getUserByName(
  { username }: { username: GetUserByNamePathParams['username'] },
  config: Partial<RequestConfig> & { client?: typeof fetch } = {},
) {
  const { client: request = fetch, ...requestConfig } = config

  const res = await request<GetUserByNameQueryResponse, ResponseErrorConfig<GetUserByName400 | GetUserByName404>, unknown>({
    method: 'GET',
    url: getGetUserByNameUrl({ username }).toString(),
    ...requestConfig,
  })
  return res.data
}
