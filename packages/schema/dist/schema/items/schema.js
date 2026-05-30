"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsSchema = void 0;
const v = __importStar(require("valibot")); // 1.31 kB
const groupSchema_js_1 = require("../common/groupSchema.js");
const itemTagsSchema_js_1 = require("../common/itemTagsSchema.js");
const teamMembershipSchma_js_1 = require("../common/teamMembershipSchma.js");
const userSchema_js_1 = require("../common/userSchema.js");
exports.ItemsSchema = v.array(v.object({
    rendered_body: v.string(),
    body: v.string(),
    coediting: v.boolean(),
    comments_count: v.number(),
    created_at: v.string(),
    group: v.nullable(groupSchema_js_1.groupSchema),
    id: v.string(),
    likes_count: v.number(),
    private: v.boolean(),
    reactions_count: v.number(),
    stocks_count: v.number(),
    tags: itemTagsSchema_js_1.itemTagsSchema,
    title: v.string(),
    updated_at: v.string(),
    url: v.string(),
    user: userSchema_js_1.userSchema,
    page_views_count: v.nullable(v.number()),
    team_membership: v.nullable(teamMembershipSchma_js_1.teamMembershipSchema),
    organization_url_name: v.nullable(v.string()),
    slide: v.boolean(),
}));
//# sourceMappingURL=schema.js.map