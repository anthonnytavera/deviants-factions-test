const express = require('express');

const userRouter = require('./user.router');
const rewardRouter = require('./reward.router');
const userRewardsRouter = require('./userRewards.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router); 
  router.use('/user', userRouter);
  router.use('/reward', rewardRouter);
  router.use('/user-rewards', userRewardsRouter);
}

module.exports = routerApi;