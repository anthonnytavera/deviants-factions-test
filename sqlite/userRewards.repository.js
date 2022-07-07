class UserRewardsRepository {
    constructor(dao){
        this.dao = dao
    }

    createTable() {
        const sql =
        `CREATE TABLE IF NOT EXISTS user_rewards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT,
            name TEXT,
            amount INTEGER,
            created datetime default current_timestamp,
            updated datetime default current_timestamp
        )`
        return this.dao.run(sql);
    }


    getUserRewardsById(id) {
        return this.dao.get(
            `SELECT * FROM user_rewards WHERE id = ?`, [id]
        );
    }

    getUserRewardsByUser(user) {
        return this.dao.allWhere(
            `SELECT * FROM user_rewards WHERE user = ?`, [user]
        );
    }

    getAllUsersRewards() {
        return this.dao.all(
            `SELECT * FROM user_rewards`
        );
    }

    getUserRewardsByUserAndName(user, name) {
        return this.dao.get(
            `SELECT * FROM user_rewards WHERE user = ? AND name = ?`, [user, name]
        );
    }

    getLastUserRewards() {
        return this.dao.get(
            `SELECT * FROM user_rewards ORDER BY id DESC LIMIT 1`
        );
    }

    createUserRewards(user, name) {
        return this.dao.run(
            `INSERT INTO user_rewards (user, name, amount)
            VALUES (?, ?, 0)`,
            [user, name]
        );
    }

    updateUserRewards(query) {
        return this.dao.run(query);
    }
}

module.exports = UserRewardsRepository;