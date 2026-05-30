import * as v from 'valibot'
import {groupSchema} from "../common/groupSchema.js";
import {itemTagsSchema} from "../common/itemTagsSchema.js";
import {userSchema} from "../common/userSchema.js";
import {teamMembershipSchema} from "../common/teamMembershipSchma.js"; // 1.31 kB


export const TagItemsSchema = v.array(
  v.object({
    rendered_body: v.string(),
    body: v.string(),
    coediting: v.boolean(),
    comments_count: v.number(),
    created_at: v.string(),
    group: groupSchema,
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

export type TagItemsSchemaType = v.InferOutput<typeof TagItemsSchema>
