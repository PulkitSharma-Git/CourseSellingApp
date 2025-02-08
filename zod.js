const zod = require("zod")

const signupSchema = zod.object({
    email: zod.string().email({message: "Please enter a valid email address"}),
    firstName: zod.string().min(1, { message: 'First name is required' }),
    lastName: zod.string().min(1, { message: 'Last name is required' }),
    password: zod.string()
        .min(6, { message: 'Password must be at least 6 characters long' }) // Minimum length
        .max(20, { message: 'Password must be at most 20 characters long' }) // Optional maximum length
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' }) // Lowercase letter
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' }) // Uppercase letter
        .regex(/[0-9]/, { message: 'Password must contain at least one number' }) // At least one digit
        .regex(/[\W_]/, { message: 'Password must contain at least one special character' }) // Special character
        .refine((val) => !val.includes(" "), { message: 'Password cannot contain spaces' }) // No spaces
})

const signinSchema = zod.object({
    email: zod.string().email({message: "Please enter a valid email address"}),
    password: zod.string()
        .min(6, { message: 'Password must be at least 6 characters long' }) // Minimum length
        .max(20, { message: 'Password must be at most 20 characters long' }) // Optional maximum length
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' }) // Lowercase letter
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' }) // Uppercase letter
        .regex(/[0-9]/, { message: 'Password must contain at least one number' }) // At least one digit
        .regex(/[\W_]/, { message: 'Password must contain at least one special character' }) // Special character
        .refine((val) => !val.includes(" "), { message: 'Password cannot contain spaces' }) // No spaces
})

module.exports = {
    signupSchema,
    signinSchema
}