import * as v from 'valibot';
export declare const itemTagsSchema: v.ArraySchema<v.ObjectSchema<{
    readonly name: v.StringSchema<undefined>;
    readonly versions: v.ArraySchema<v.StringSchema<undefined>, undefined>;
}, undefined>, undefined>;
export type ItemTagsSchemaType = v.InferOutput<typeof itemTagsSchema>;
//# sourceMappingURL=itemTagsSchema.d.ts.map