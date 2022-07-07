const Joi = require('joi');

const id = Joi.number().integer();
const user = Joi.string().min(3).max(15);
const name = Joi.string().min(3).max(15);
const amount = Joi.number().integer();

const createUserRewardsSchema = Joi.object({
    user: user.required(),
    name: name.required()
});

const updateUserRewardsSchema = Joi.object({
    name: name,
    amount: amount,
});

const getUserRewardsSchema = Joi.object({
    id: id.required()
});

const getUserRewardsByUserSchema = Joi.object({
    user: user.required()
});

module.exports = {createUserRewardsSchema, updateUserRewardsSchema, getUserRewardsSchema, getUserRewardsByUserSchema}