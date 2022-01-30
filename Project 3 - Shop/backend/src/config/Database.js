import { Sequelize } from "sequelize";
import { database_config } from "./database_config.js";
import Category from "../model/Category.js";
import Item from "../model/Item.js";

class Database {
    static _sequelize;

    static getSequelize() {
        if (!(this._sequelize instanceof Sequelize)) {
            this._sequelize = new Sequelize(database_config.DB, database_config.USER, database_config.PASSWORD, {
                host   : database_config.HOST,
                dialect: database_config.dialect
            })
        }
        return this._sequelize;
    }

    static async initializeModels() {
        const sequelize = this.getSequelize();
        Category
            .initialize(sequelize);

        Item
            .initialize(sequelize)
            .associate();
    }
}

export default Database;