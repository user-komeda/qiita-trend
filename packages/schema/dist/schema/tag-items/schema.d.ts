import * as v from 'valibot';
export declare const TagItemsSchema: v.ArraySchema<v.ObjectSchema<{
    readonly rendered_body: v.StringSchema<undefined>;
    readonly body: v.StringSchema<undefined>;
    readonly coediting: v.BooleanSchema<undefined>;
    readonly comments_count: v.NumberSchema<undefined>;
    readonly created_at: v.StringSchema<undefined>;
    readonly group: v.NullableSchema<v.ObjectSchema<{
        readonly created_at: v.StringSchema<undefined>;
        readonly description: v.StringSchema<undefined>;
        readonly name: v.StringSchema<undefined>;
        readonly private: v.BooleanSchema<undefined>;
        readonly updated_at: v.StringSchema<undefined>;
        readonly url_name: v.StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly id: v.StringSchema<undefined>;
    readonly likes_count: v.NumberSchema<undefined>;
    readonly private: v.BooleanSchema<undefined>;
    readonly reactions_count: v.NumberSchema<undefined>;
    readonly stocks_count: v.NumberSchema<undefined>;
    readonly tags: v.ArraySchema<v.ObjectSchema<{
        readonly name: v.StringSchema<undefined>;
        readonly versions: v.ArraySchema<v.StringSchema<undefined>, undefined>;
    }, undefined>, undefined>;
    readonly title: v.StringSchema<undefined>;
    readonly updated_at: v.StringSchema<undefined>;
    readonly url: v.StringSchema<undefined>;
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
    readonly page_views_count: v.NullableSchema<v.NumberSchema<undefined>, undefined>;
    readonly team_membership: v.NullableSchema<v.ObjectSchema<{
        readonly description: v.StringSchema<undefined>;
        readonly email: v.SchemaWithPipe<readonly [v.StringSchema<undefined>, v.EmailAction<string, undefined>]>;
        readonly id: v.StringSchema<undefined>;
        readonly last_accessed_at: v.StringSchema<undefined>;
        readonly name: v.StringSchema<undefined>;
    }, undefined>, undefined>;
    readonly organization_url_name: v.NullableSchema<v.StringSchema<undefined>, undefined>;
    readonly slide: v.BooleanSchema<undefined>;
}, undefined>, undefined>;
export type TagItemsSchemaType = v.InferOutput<typeof TagItemsSchema>;
//# sourceMappingURL=schema.d.ts.map