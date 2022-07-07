const express = require("express");

const UserRewardsService = require("../services/userRewards.service");
const validatorHandler = require("../middlewares/validator.handler");
const {createUserRewardsSchema, updateUserRewardsSchema, getUserRewardsByUserSchema, getUserRewardsSchema} = require("../schemas/userRewards.schema");

const router = express.Router();
const service = new UserRewardsService();

// Route Create User Rewards
router.post(
    "/",
    validatorHandler(createUserRewardsSchema, "body"),
    async(req, res, next) => {
        try {
            const body = req.body;
            const newUserRewards = await service.create(body);
            res.status(201).json(newUserRewards);
        } catch (error) {
            next(error);
        }
    }
);

// Route Update User Rewards
router.patch('/:id',
  validatorHandler(getUserRewardsSchema, 'params'),
  validatorHandler(updateUserRewardsSchema, 'body'),
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

// Route Get All Users Rewards
router.get('/all',
  async (req, res, next) => {
    try {
      const usersRewards = await service.findAll();
      res.json(usersRewards);
    } catch (error) {
      next(error);
    }
  }
);

// Route Get User Rewards By Id
router.get('/:id',
  validatorHandler(getUserRewardsSchema, 'params'),
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

// Route Get User Rewards By User
router.get('/user/:user',
  validatorHandler(getUserRewardsByUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { user } = req.params;
      const userRewards = await service.findByUser(user);
      res.json(userRewards);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;