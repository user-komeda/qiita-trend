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
exports.userSchema = void 0;
const v = __importStar(require("valibot")); // 1.31 kB
exports.userSchema = v.object({
    description: v.nullable(v.string()),
    facebook_id: v.nullable(v.string()),
    followees_count: v.number(),
    followers_count: v.number(),
    github_login_name: v.nullable(v.string()),
    id: v.string(),
    items_count: v.number(),
    linkedin_id: v.nullable(v.string()),
    location: v.nullable(v.string()),
    name: v.nullable(v.string()),
    organization: v.nullable(v.string()),
    permanent_id: v.number(),
    profile_image_url: v.string(),
    team_only: v.boolean(),
    twitter_screen_name: v.nullable(v.string()),
    website_url: v.nullable(v.string()),
});
//# sourceMappingURL=userSchema.js.map