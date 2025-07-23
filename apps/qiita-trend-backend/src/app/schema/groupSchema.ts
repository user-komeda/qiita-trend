import * as v from 'valibot' // 1.31 kB

export const groupSchema = v.object({
  created_at: v.string(),
  description: v.string(),
  name: v.string(),
  private: v.boolean(),
  updated_at: v.string(),
  url_name: v.string(),
})

export type GroupSchemaType = v.InferOutput<typeof groupSchema>
