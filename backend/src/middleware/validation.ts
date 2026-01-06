import type { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateMyUserRequest = [
    // Add validation rules here as needed
    body('username')
        .isString()
        .notEmpty()
        .withMessage('Name must be a string'),
    body('city')
        .isString()
        .notEmpty()
        .withMessage('City must be a string'),
    body('country')
        .isString()
        .notEmpty()
        .withMessage('Country must be a string'),
    body('addressLine')
        .isString()
        .notEmpty()
        .withMessage('Address line must be a string'),
    handleValidationErrors
]