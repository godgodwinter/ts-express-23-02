"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdate = exports.validate = void 0;
const express_validator_1 = require("express-validator");
exports.validate = [
    (0, express_validator_1.check)('nama').isLength({ min: 1 }).isString().trim().escape(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({
                errors: errors.array()
            });
        }
        return next();
    }
];
exports.validateUpdate = [
    (0, express_validator_1.check)('name').isLength({ min: 1 }).isString().trim().escape(),
    (0, express_validator_1.check)('prefix').isLength({ min: 1 }).isString(),
    (0, express_validator_1.check)('kode').isLength({ min: 1 }).isString().trim().escape(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({
                errors: errors.array()
            });
        }
        return next();
    }
];
// export default validate;
