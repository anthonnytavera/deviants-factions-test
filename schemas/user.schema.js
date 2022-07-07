const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const credits = Joi.number().integer();
const connections = Joi.number().integer();
const number_play = Joi.number().integer();

const createUserSchema = Joi.object({
    name: name.required(),
    credits: credits,
    connections: connections,
    number_play: number_play
});

const updateUserSchema = Joi.object({
    credits: credits,
    connections: connections,
    number_play: number_play
});

const getUserSchema = Joi.object({
    id: id.required()
});


module.exports = {createUserSchema, updateUserSchema, getUserSchema}

