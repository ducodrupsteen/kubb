import type { AddPetRequest } from './AddPetRequest.ts'
import type { Pet } from './Pet.ts'

/**
 * @description Successful operation
 */
export type AddPet200 = Omit<NonNullable<Pet>, 'name'>

/**
 * @description Pet not found
 */
export type AddPet405 = {
  /**
   * @type integer | undefined, int32
   */
  code?: number
  /**
   * @type string | undefined
   */
  message?: string
}

/**
 * @description Create a new pet in the store
 */
export type AddPetMutationRequest = AddPetRequest

export type AddPetMutationResponse = AddPet200

export type AddPetMutation = {
  Response: AddPet200
  Request: AddPetMutationRequest
  Errors: AddPet405
}
