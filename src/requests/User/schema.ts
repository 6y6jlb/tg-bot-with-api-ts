import Joi from 'joi';


export const loginUserSchema = Joi.object({
    email: Joi.string().email(),
    telegram_id: Joi.string(),
    password: Joi.string().min(3).max(30).required(),
})
    .or('email', 'telegram_id');

export const storeUserSchema = Joi.object({
    email: Joi.string().email(),
    name: Joi.string().min(3).max(100),
    password: Joi.string().min(3).max(30).required(),
    password_repeat: Joi.any().valid(Joi.ref('password')).required()
})
    .or('email', 'telegram_id');

export const getUserSchema = Joi.object({
    email: Joi.string().email(),
    telegram_id: Joi.string(),
}).or('email', 'telegram_id');


export const UpdateUserSchema = Joi.object({
    email: Joi.string().email(),
    name: Joi.string(),
    currency: Joi.string(),
    locale: Joi.string(),
    tz: Joi.string(),
    password: Joi.string().min(3).max(30).required(),
})
    .or('email', 'telegram_id');


export const resetUserPasswordSchema = Joi.object({
    email: Joi.string().email(),
    telegram_id: Joi.string(),
}).or('email', 'telegram_id');


export const logoutUserPasswordSchema = Joi.object({
    email: Joi.string().email(),
    telegram_id: Joi.string(),
}).or('email', 'telegram_id');


export const deleteUserSchema = Joi.object({
    email: Joi.string().email(),
    telegram_id: Joi.string(),
}).or('email', 'telegram_id');

