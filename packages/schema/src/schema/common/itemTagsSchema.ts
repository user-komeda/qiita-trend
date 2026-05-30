import * as v from 'valibot' // 1.31 kB

export const itemTagsSchema = v.array(
  v.object({
    name: v.string(),
    versions: v.array(v.string()),
  }),
)

export type ItemTagsSchemaType = v.InferOutput<typeof itemTagsSchema>
