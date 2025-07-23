import * as v from 'valibot' // 1.31 kB

export const userSchema = v.object({
  description: v.nullable(v.string()),
  facebook_id: v.nullable(v.string()),
  followees_count: v.number(),
  followers_count: v.number(),
  github_login_name: v.nullable(v.string()),
  id: v.string(),
  items_count: v.number(),
  linkedin_id: v.nullable(v.string()),
  location: v.nullable(v.string()),
  name: v.nullable(v.string()),
  organization: v.nullable(v.string()),
  permanent_id: v.number(),
  profile_image_url: v.string(),
  team_only: v.boolean(),
  twitter_screen_name: v.nullable(v.string()),
  website_url: v.nullable(v.string()),
})
export type userSchemaType = v.InferOutput<typeof userSchema>
