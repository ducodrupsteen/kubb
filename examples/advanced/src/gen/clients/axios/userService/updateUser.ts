import fetch from '../../../../axios-client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../../../axios-client.ts'
import type { UpdateUserMutationRequest, UpdateUserMutationResponse, UpdateUserPathParams } from '../../../models/ts/userController/UpdateUser.ts'
import { updateUserMutationResponseSchema, updateUserMutationRequestSchema } from '../../../zod/userController/updateUserSchema.ts'

export function getUpdateUserUrl({ username }: { username: UpdateUserPathParams['username'] }) {
  return `https://petstore3.swagger.io/api/v3/user/${username}` as const
}

/**
 * @description This can only be done by the logged in user.
 * @summary Update user
 * {@link /user/:username}
 */
export async function updateUser(
  { username, data }: { username: UpdateUserPathParams['username']; data?: UpdateUserMutationRequest },
  config: Partial<RequestConfig<UpdateUserMutationRequest>> & { client?: typeof fetch } = {},
) {
  const { client: request = fetch, ...requestConfig } = config

  const requestData = updateUserMutationRequestSchema.parse(data)
  const res = await request<UpdateUserMutationResponse, ResponseErrorConfig<Error>, UpdateUserMutationRequest>({
    method: 'PUT',
    url: getUpdateUserUrl({ username }).toString(),
    data: requestData,
    ...requestConfig,
  })
  return { ...res, data: updateUserMutationResponseSchema.parse(res.data) }
}
