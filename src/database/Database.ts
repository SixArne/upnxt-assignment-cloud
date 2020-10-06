import sqlite3 from 'sqlite3';

export default class Database {
    static INSTANCE: sqlite3.Database;

    public constructor() {
        Database.INSTANCE = new sqlite3.Database(':memory:');

        Database.INSTANCE.serialize(() => {
            Database.INSTANCE.run('CREATE TABLE game (id TEXT, score INT)');
        });
    }

    public static createInstance() {
        if (Database.INSTANCE == null) {
            new Database();
        }

        return Database.INSTANCE;
    }
}