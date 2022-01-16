import Joi from 'joi';

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
});

export function validateLogin(body: any) {
    const validate = schema.validate(body);
    if (validate.error) {
        return {
            isValid: false,
            message: validate.error.message,
        };
    }
    return {
        isValid: true,
    };
}
