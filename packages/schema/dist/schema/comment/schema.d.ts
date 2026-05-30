import * as v from 'valibot';
export declare const CommentSchema: v.ArraySchema<v.ObjectSchema<{
    readonly body: v.StringSchema<undefined>;
    readonly created_at: v.StringSchema<undefined>;
    readonly id: v.StringSchema<undefined>;
    readonly rendered_body: v.StringSchema<undefined>;
    readonly updated_at: v.StringSchema<undefined>;
    readonly user: v.ObjectSchema<{
        readonly description: v.NullableSchema<v.StringSchema<undefined>, undefined>;
        readonly facebook_id: v.NullableSchema<v.StringSchema<undefined>, undefined>;
        readonly followees_count: v.NumberSchema<undefined>;
        readonly followers_count: v.NumberSchema<undefined>;
        readonly github_login_name: v.NullableSchema<v.StringSchema<undefined>, undefined>;
        readonly id: v.StringSchema<undefined>;
        readonly items_count: v.NumberSchema<undefined>;
        readonly linkedin_id: v.NullableSchema<v.StringSchema<undefined>, undefined>;
        readonly location: v.NullableSchema<v.StringSchema<undefined>, undefined>;
        readonly name: v.NullableSchema<v.StringSchema<undefined>, undefined>;
        readonly organization: v.NullableSchema<v.StringSchema<undefined>, undefined>;
        readonly permanent_id: v.NumberSchema<undefined>;
        readonly profile_image_url: v.StringSchema<undefined>;
        readonly team_only: v.BooleanSchema<undefined>;
        readonly twitter_screen_name: v.NullableSchema<v.StringSchema<undefined>, undefined>;
        readonly website_url: v.NullableSchema<v.StringSchema<undefined>, undefined>;
    }, undefined>;
}, undefined>, undefined>;
export type CommentSchemaType = v.InferOutput<typeof CommentSchema>;
//# sourceMappingURL=schema.d.ts.map