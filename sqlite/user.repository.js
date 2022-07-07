class UserRepository {
    constructor(dao){
        this.dao = dao
    }

    createTable() {
        const sql =
        `CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            credits INTEGER,
            connections INTEGER,
            number_play INTEGER,
            created datetime default current_timestamp,
            updated datetime default current_timestamp
        )`
        return this.dao.run(sql);
    }

    getAllUsers() {
        return this.dao.all(
            `SELECT * FROM user`
        );
    }


    getUserById(id) {
        return this.dao.get(
            `SELECT * FROM user WHERE id = ?`, [id]
        );
    }

    getUserByName(name) {
        return this.dao.get(
            `SELECT * FROM user WHERE name = ?`, [name]
        );
    }

    getLastUser() {
        return this.dao.get(
            `SELECT * FROM user ORDER BY id DESC LIMIT 1`
        );
    }

    createUser(data) {
        return this.dao.run(
            `INSERT INTO user (name, credits, connections, number_play)
            VALUES (?, ?, ?, ?)`,
            [data.name, data.credits ? data.credits : 0, 0, data.number_play ? data.number_play : 0]
        );
    }

    updateUser(query) {
        return this.dao.run(query);
    }
}

module.exports = UserRepository