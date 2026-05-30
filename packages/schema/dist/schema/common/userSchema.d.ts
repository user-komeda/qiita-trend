import * as v from 'valibot';
export declare const userSchema: v.ObjectSchema<{
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
export type userSchemaType = v.InferOutput<typeof userSchema>;
//# sourceMappingURL=userSchema.d.ts.map