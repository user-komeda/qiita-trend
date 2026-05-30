import * as v from 'valibot';
export declare const teamMembershipSchema: v.ObjectSchema<{
    readonly description: v.StringSchema<undefined>;
    readonly email: v.SchemaWithPipe<readonly [v.StringSchema<undefined>, v.EmailAction<string, undefined>]>;
    readonly id: v.StringSchema<undefined>;
    readonly last_accessed_at: v.StringSchema<undefined>;
    readonly name: v.StringSchema<undefined>;
}, undefined>;
export type TeamMembershipSchemaType = v.InferOutput<typeof teamMembershipSchema>;
//# sourceMappingURL=teamMembershipSchma.d.ts.map