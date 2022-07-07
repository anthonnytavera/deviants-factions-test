var log = require("log4js").getLogger("userRewards.service");
const boom = require('@hapi/boom');
const Promise = require('bluebird')
const AppDAO = require('../sqlite/dao')
const UserRewardsRepository = require('../sqlite/userRewards.repository');

const dao = new AppDAO('./database.sqlite3');
const userRewardsRepo = new UserRewardsRepository(dao);

class UserRewardsService {

    constructor() {}

    create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                // Create table userRewards if not exists
                await userRewardsRepo.createTable();

                // Check if userRewards not exists
                const userRewards = await userRewardsRepo.getUserRewardsByUserAndName(data.user, data.name);
                if (!userRewards) {
                    // Create userRewards
                    await userRewardsRepo.createUserRewards(data.user, data.name);

                    // Last userRewards
                    const newUserRewards =  await userRewardsRepo.getLastUserRewards();

                    resolve(newUserRewards);
                } else {
                    log.error("UserRewards duplicate");
                    throw boom.conflict("UserRewards duplicate");
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
                // Create table user_rewards if not exists
                await userRewardsRepo.createTable();

                // Check if userRewards not exist
                const userRewards = await userRewardsRepo.getUserRewardsByUserAndName(body.user, body.name);

                if (!userRewards) {
                    // Get keys object
                    let keys = Object.keys(body);

                    //  Construct query update
                    let setters = '';
                    for (let index = 0; index < keys.length; index++) {
                        setters = setters + ` ${keys[index]} = ${body[keys[index]]},`
                    }

                    setters = setters + ` updated = current_timestamp `

                    let where = ` WHERE id = ${id}`;

                    let query = `UPDATE user_rewards SET ${setters} ${where}`;

                    // Update UserRewards
                    await userRewardsRepo.updateUserRewards(query);

                    // UserRewards updated
                    const updateUserRewards = await userRewardsRepo.getUserRewardsById(id);

                    resolve(updateUserRewards);
                    
                } else {
                    log.error("UserRewards duplicate");
                    throw boom.conflict("UserRewards duplicate");
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
                // Create table user_rewards if not exists
                await userRewardsRepo.createTable();

                // Find userRewards
                const userRewards = await userRewardsRepo.getUserRewardsById(id);

                // Check if exist
                if (!userRewards) {
                    throw boom.notFound("UserRewards not found");
                }

                resolve(userRewards);
            } catch (error) {
                log.error(error);
                reject(error);
            }
        });
    }

    findByUser(user) {
        return new Promise(async (resolve, reject) => {
            try {
                // Create table user_rewards if not exists
                await userRewardsRepo.createTable();

                // Find userRewards
                const userRewards = await userRewardsRepo.getUserRewardsByUser(user);

                // Check if exist
                if (!userRewards) {
                    throw boom.notFound("UserRewards not found");
                }

                resolve(userRewards);
            } catch (error) {
                log.error(error);
                reject(error);
            }
        });
    }

    findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                // Create table user_rewards if not exists
                await userRewardsRepo.createTable();

                // Find all rewards
                const userRewards = await userRewardsRepo.getAllUsersRewards();

                resolve(userRewards);
            } catch (error) {
                log.error(error);
                reject(error);
            }
        });
    }

}

module.exports = UserRewardsService;