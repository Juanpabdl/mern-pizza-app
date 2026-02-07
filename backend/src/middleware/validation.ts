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
];

export const validateMyMenuRequest = [
    body('name')
        .isString()
        .notEmpty()
        .withMessage('Name is required'),
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be a number greater than 0'),
    body('category')
        .isArray()
        .withMessage('Category must be an array')
        .not()
        .isEmpty()
        .withMessage('Category array cannot be empty'),
    handleValidationErrors
];