const express = require("express");

const UserService = require("../services/user.service");
const validatorHandler = require("../middlewares/validator.handler");
const {createUserSchema, updateUserSchema, getUserSchema} = require("../schemas/user.schema");

const router = express.Router();
const service = new UserService();

// Route Create User
router.post(
    "/",
    validatorHandler(createUserSchema, "body"),
    async(req, res, next) => {
        try {
            const body = req.body;
            const newUser = await service.create(body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }
);

// Route Update User
router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

// Route Get All Users
router.get('/all',
  async (req, res, next) => {
    try {
      const users = await service.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

// Route Get User By Id
router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;