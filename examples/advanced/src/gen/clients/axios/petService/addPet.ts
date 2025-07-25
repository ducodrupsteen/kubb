import fetch from '../../../../axios-client.ts'
import type { RequestConfig, ResponseErrorConfig } from '../../../../axios-client.ts'
import type { AddPetMutationRequest, AddPetMutationResponse, AddPet405 } from '../../../models/ts/petController/AddPet.ts'
import { addPetMutationResponseSchema, addPetMutationRequestSchema } from '../../../zod/petController/addPetSchema.ts'

export function getAddPetUrl() {
  return 'https://petstore3.swagger.io/api/v3/pet' as const
}

/**
 * @description Add a new pet to the store
 * @summary Add a new pet to the store
 * {@link /pet}
 */
export async function addPet(
  { data }: { data: AddPetMutationRequest },
  config: Partial<RequestConfig<AddPetMutationRequest>> & { client?: typeof fetch } = {},
) {
  const { client: request = fetch, ...requestConfig } = config

  const requestData = addPetMutationRequestSchema.parse(data)
  const res = await request<AddPetMutationResponse, ResponseErrorConfig<AddPet405>, AddPetMutationRequest>({
    method: 'POST',
    url: getAddPetUrl().toString(),
    data: requestData,
    ...requestConfig,
  })
  return { ...res, data: addPetMutationResponseSchema.parse(res.data) }
}
