import * as v from 'valibot' // 1.31 kB

import { userSchema } from '../common/userSchema.js'

export const CommentSchema = v.array(
  v.object({
    body: v.string(),
    created_at: v.string(),
    id: v.string(),
    rendered_body: v.string(),
    updated_at: v.string(),
    user: userSchema,
  }),
)

export type CommentSchemaType = v.InferOutput<typeof CommentSchema>
