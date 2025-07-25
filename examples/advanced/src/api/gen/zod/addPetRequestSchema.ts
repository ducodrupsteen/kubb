/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { AddPetRequest } from '../types/AddPetRequest.ts'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { categorySchema } from './categorySchema.ts'
import { tagTagSchema } from './tag/tagSchema.ts'
import { z } from 'zod'

export const addPetRequestSchema = z.object({
  id: z.coerce.number().int().optional(),
  name: z.string(),
  category: z.lazy(() => categorySchema).optional(),
  photoUrls: z.array(z.string()),
  tags: z.array(z.lazy(() => tagTagSchema)).optional(),
  status: z.enum(['available', 'pending', 'sold']).describe('pet status in the store').optional(),
}) as unknown as ToZod<AddPetRequest>
