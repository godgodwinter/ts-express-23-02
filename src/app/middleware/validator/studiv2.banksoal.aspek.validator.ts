import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const validate = [
    check('nama').isLength({ min: 1 }).isString().trim().escape(),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({
                errors: errors.array()
            });
        }


        return next();
    }
]


export const validateUpdate = [
    check('name').isLength({ min: 1 }).isString().trim().escape(),
    check('prefix').isLength({ min: 1 }).isString(),
    check('kode').isLength({ min: 1 }).isString().trim().escape(),
    (req: Request, res: Response, next: NextFunction) => {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({
                errors: errors.array()
            });
        }

        return next();
    }
]

// export default validate;