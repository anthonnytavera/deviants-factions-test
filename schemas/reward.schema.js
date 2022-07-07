const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const amount = Joi.number().integer();
const status = Joi.boolean().default(false);

const createRewardSchema = Joi.object({
    name: name.required(),
    amount: amount.required(),
    status: status
});

const updateRewardSchema = Joi.object({
    name: name,
    amount: amount,
    status: status
});

const getRewardSchema = Joi.object({
    id: id.required()
});

module.exports = {createRewardSchema, updateRewardSchema, getRewardSchema}