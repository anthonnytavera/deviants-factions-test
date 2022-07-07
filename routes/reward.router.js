const express = require("express");

const RewardService = require("../services/reward.service");
const validatorHandler = require("../middlewares/validator.handler");
const {createRewardSchema, updateRewardSchema, getRewardSchema} = require("../schemas/reward.schema");

const router = express.Router();
const service = new RewardService();

// Route Create Reward
router.post(
    "/",
    validatorHandler(createRewardSchema, "body"),
    async(req, res, next) => {
        try {
            const body = req.body;
            const newReward = await service.create(body);
            res.status(201).json(newReward);
        } catch (error) {
            next(error);
        }
    }
);

// Route Update Reward
router.patch('/:id',
  validatorHandler(getRewardSchema, 'params'),
  validatorHandler(updateRewardSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const reward = await service.update(id, body);
      res.json(reward);
    } catch (error) {
      next(error);
    }
  }
);

// Route Get All Rewards
router.get('/all',
  async (req, res, next) => {
    try {
      const rewards = await service.findAll();
      res.json(rewards);
    } catch (error) {
      next(error);
    }
  }
);

// Route Get Reward By Id
router.get('/:id',
  validatorHandler(getRewardSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const reward = await service.findOne(id);
      res.json(reward);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;