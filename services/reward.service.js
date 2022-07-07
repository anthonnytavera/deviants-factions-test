var log = require("log4js").getLogger("reward.service");
const boom = require('@hapi/boom');
const Promise = require('bluebird')
const AppDAO = require('../sqlite/dao')
const RewardRepository = require('../sqlite/reward.repository');

const dao = new AppDAO('./database.sqlite3');
const rewardRepo = new RewardRepository(dao);

class RewardService {

    constructor() {}

    create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                // Create table reward if not exists
                await rewardRepo.createTable();

                // Check if reward not exists
                const reward = await rewardRepo.getRewardByNameAndAmount(data.name, data.amount);
                if (!reward) {
                    // Create reward
                    await rewardRepo.createReward(data.name, data.amount);

                    // Last reward
                    const newReward =  await rewardRepo.getLastReward();

                    resolve(newReward);
                } else {
                    log.error("Reward duplicate");
                    throw boom.conflict("Reward duplicate");
                }
            } catch (error) {
                log.error(error);
                reject(error);
            }
        });
    }

    update(id, body) {
        return new Promise(async (resolve, reject) => {
            try {
                // Create table reward if not exists
                await rewardRepo.createTable();

                // Check if reward not exist;
                const reward = await rewardRepo.getRewardByNameAndAmount(body.name, body.amount);

                if (!reward) {
                    // Get keys object
                    let keys = Object.keys(body);

                    //  Construct query update
                    let setters = '';
                    for (let index = 0; index < keys.length; index++) {
                        setters = setters + ` ${keys[index]} = ${body[keys[index]]},`
                    }

                    setters = setters + ` updated = current_timestamp `

                    let where = ` WHERE id = ${id}`;

                    let query = `UPDATE reward SET ${setters} ${where}`;

                    // Update Reward
                    await rewardRepo.updateReward(query);

                    // Reward updated
                    const updateReward = await rewardRepo.getRewardById(id);

                    resolve(updateReward);
                    
                } else {
                    log.error("Reward duplicate");
                    throw boom.conflict("Reward duplicate");
                }

            } catch (error) {
                log.error(error);
                reject(error);
            }
        });
    }

    findOne(id) {
        return new Promise(async (resolve, reject) => {
            try {
                // Create table reward if not exists
                await rewardRepo.createTable();

                // Find reward
                const reward = await rewardRepo.getRewardById(id);

                // Check if exist
                if (!reward) {
                    throw boom.notFound("Reward not found");
                }

                resolve(reward);
            } catch (error) {
                log.error(error);
                reject(error);
            }
        });
    }

    findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                // Create table reward if not exists
                await rewardRepo.createTable();

                // Find all rewards
                const rewards = await rewardRepo.getAllRewards();

                resolve(rewards);
            } catch (error) {
                log.error(error);
                reject(error);
            }
        });
    }

}

module.exports = RewardService;