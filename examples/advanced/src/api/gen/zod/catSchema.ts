/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/**
 * Generated by Kubb (https://kubb.dev/).
 * Do not edit manually.
 */

import type { Cat } from '../types/Cat.ts'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const catSchema = z.object({
  type: z.string().min(1),
  name: z.string().optional(),
  indoor: z.boolean(),
}) as unknown as ToZod<Cat>
