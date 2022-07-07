class RewardRepository {
    constructor(dao){
        this.dao = dao
    }

    createTable() {
        const sql =
        `CREATE TABLE IF NOT EXISTS reward (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            amount INTEGER,
            status BOOLEAN,
            created datetime default current_timestamp,
            updated datetime default current_timestamp
        )`
        return this.dao.run(sql);
    }

    getAllRewards() {
        return this.dao.all(
            `SELECT * FROM reward`
        );
    }

    getRewardById(id) {
        return this.dao.get(
            `SELECT * FROM reward WHERE id = ?`, [id]
        );
    }

    getLastReward() {
        return this.dao.get(
            `SELECT * FROM reward ORDER BY id DESC LIMIT 1`
        );
    }

    getRewardByNameAndAmount(name, amount) {
        return this.dao.get(
            `SELECT * FROM reward WHERE name = ? AND amount = ?`, [name, amount]
        );
    }

    createReward(name, amount) {
        return this.dao.run(
            `INSERT INTO reward (name, amount)
            VALUES (?, ?)`,
            [name, amount]
        );
    }

    updateReward(query) {
        return this.dao.run(query);
    }
}

module.exports = RewardRepository;