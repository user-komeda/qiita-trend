import * as v from 'valibot';
export declare const groupSchema: v.NullableSchema<v.ObjectSchema<{
    readonly created_at: v.StringSchema<undefined>;
    readonly description: v.StringSchema<undefined>;
    readonly name: v.StringSchema<undefined>;
    readonly private: v.BooleanSchema<undefined>;
    readonly updated_at: v.StringSchema<undefined>;
    readonly url_name: v.StringSchema<undefined>;
}, undefined>, undefined>;
export type GroupSchemaType = v.InferOutput<typeof groupSchema>;
//# sourceMappingURL=groupSchema.d.ts.map