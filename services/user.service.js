var log = require("log4js").getLogger("user.service");
const boom = require('@hapi/boom');
const Promise = require('bluebird')
const AppDAO = require('../sqlite/dao')
const UserRepository = require('../sqlite/user.repository');

const dao = new AppDAO('./database.sqlite3');
const userRepo = new UserRepository(dao);

class UserService {

    constructor() {}

    create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                // Create table user if not exists
                await userRepo.createTable();

                // Check if user not exists
                const user = await userRepo.getUserByName(data.name);
                if (!user) {
                    // Create user
                    await userRepo.createUser(data);

                    // Last user
                    const newUser =  await userRepo.getLastUser();

                    resolve(newUser);
                } else {
                    log.error("User duplicate");
                    throw boom.conflict("User duplicate");
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
                // Create table user if not exists
                await userRepo.createTable();

                // Get keys object
                let keys = Object.keys(body);

                //  Construct query update
                let setters = '';
                for (let index = 0; index < keys.length; index++) {
                    setters = setters + ` ${keys[index]} = ${body[keys[index]]},`
                }

                setters = setters + ` updated = current_timestamp `

                let where = ` WHERE id = ${id}`;

                let query = `UPDATE user SET ${setters} ${where}`;

                // Update User
                await userRepo.updateUser(query);

                // User updated
                const updateUser = await userRepo.getUserById(id);

                resolve(updateUser);
            } catch (error) {
                log.error(error);
                reject(error);
            }
        });
    }

    findOne(id) {
        return new Promise(async (resolve, reject) => {
            try {
                // Create table user if not exists
                await userRepo.createTable();

                // Find user
                const user = await userRepo.getUserById(id);

                // Check if exist
                if (!user) {
                    throw boom.notFound("User not found");
                }

                resolve(user);
            } catch (error) {
                log.error(error);
                reject(error);
            }
        });
    }


    findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                // Create table user if not exists
                await userRepo.createTable();

                // Find all users
                const users = await userRepo.getAllUsers();

                resolve(users);
            } catch (error) {
                log.error(error);
                reject(error);
            }
        });
    }

}

module.exports = UserService;