"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const Joi = require("joi");
exports.validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'local')
        .default('development'),
    PORT: Joi.number().default(8000),
});
//# sourceMappingURL=validationSchema.js.map