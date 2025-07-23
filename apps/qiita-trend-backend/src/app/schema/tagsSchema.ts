import * as v from 'valibot' // 1.31 kB

export const tagsSchema = v.array(
  v.object({
    id: v.string(),
    items_count: v.number(),
    icon_url: v.nullable(v.string()),
    followers_count: v.number(),
  }),
)

export type TagsSchemaType = v.InferOutput<typeof tagsSchema>
