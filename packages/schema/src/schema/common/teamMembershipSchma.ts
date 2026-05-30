import * as v from 'valibot'

export const teamMembershipSchema = v.object({
  description: v.string(),
  email: v.pipe(v.string(), v.email()),
  id: v.string(),
  last_accessed_at: v.string(),
  name: v.string(),
})

export type TeamMembershipSchemaType = v.InferOutput<
  typeof teamMembershipSchema
>
