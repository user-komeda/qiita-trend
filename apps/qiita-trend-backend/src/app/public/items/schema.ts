import * as v from 'valibot' // 1.31 kB

import { groupSchema } from '@/app/schema/groupSchema'
import { itemTagsSchema } from '@/app/schema/itemTagsSchema'
import { teamMembershipSchema } from '@/app/schema/teamMembershipSchma'
import { userSchema } from '@/app/schema/userSchema'

export const schema = v.array(
  v.object({
    rendered_body: v.string(),
    body: v.string(),
    coediting: v.boolean(),
    comments_count: v.number(),
    created_at: v.string(),
    group: v.nullable(groupSchema),
    id: v.string(),
    likes_count: v.number(),
    private: v.boolean(),
    reactions_count: v.number(),
    stocks_count: v.number(),
    tags: itemTagsSchema,
    title: v.string(),
    updated_at: v.string(),
    url: v.string(),
    user: userSchema,
    page_views_count: v.nullable(v.number()),
    team_membership: v.nullable(teamMembershipSchema),
    organization_url_name: v.nullable(v.string()),
    slide: v.boolean(),
  }),
)

export type ItemsSchemaType = v.InferOutput<typeof schema>
