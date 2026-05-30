import * as v from 'valibot';
export declare const TagsSchema: v.ArraySchema<v.ObjectSchema<{
    readonly id: v.StringSchema<undefined>;
    readonly items_count: v.NumberSchema<undefined>;
    readonly icon_url: v.NullableSchema<v.StringSchema<undefined>, undefined>;
    readonly followers_count: v.NumberSchema<undefined>;
}, undefined>, undefined>;
export type TagsSchemaType = v.InferOutput<typeof TagsSchema>;
//# sourceMappingURL=tagsSchema.d.ts.map